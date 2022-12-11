import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import ProfileInfoComponent from 'src/components/profile/ProfileInfoComponent.vue'
import axios from 'axios'

vi.mock("axios", () => {
    return {
        default: {
            delete: vi.fn(),
        },
    };
});

describe('Tests for the Profile Info Component', () => {
    let wrapper = null

    beforeEach(() => {
        // render the component
        wrapper = shallowMount(ProfileInfoComponent, {
            props: {
                profile: {
                    discordName: "Xermos",
                    nickname: "Xermos",
                    avatar: "avatar",
                    firstName: "Jesper",
                    lastName: "Oja",
                    age: "33",
                    joiningDate: "12.11.2022",
                    profileId: "Jepsu"
                  },
                isOwner: true
            }
        })
        
        })

    it('AvatarHelper is getting right values', () => {
        const avatar = wrapper.findComponent({ref: "avatarHelper"})
        expect(avatar.props().avatar).toBe('avatar')
        expect(avatar.props().profileId).toBe('Jepsu')
    })

    it('Profile info component showing and profile edit component not showing', () => {

        expect(wrapper.vm.editing).toBeFalsy()

        const profileInfo = wrapper.findComponent({ref: "profileInfo"})
        expect(profileInfo.exists()).toBeTruthy()

        const profileEdit = wrapper.findComponent({ref: "profileEdit"})
        expect(profileEdit.exists()).toBeFalsy()
    })

    it('Profile control buttons showing if isOwner true and isDeleting/isEditing false', async () => {
        expect(wrapper.vm.isOwner).toBeTruthy()
        expect(wrapper.vm.editing).toBeFalsy()

        const controlButtons = wrapper.find('#controlButtons')
        expect(controlButtons.exists()).toBeTruthy()

        const deleteButton = wrapper.find('#deleteButton')
        expect(deleteButton.exists()).toBeTruthy()

        const editButton = wrapper.find('#editButton')
        expect(editButton.exists()).toBeTruthy()

        const linkButton = wrapper.find('#linkButton')
        expect(linkButton.exists()).toBeTruthy()
    })

    it('Clicking edit button changes editing value and shows profile edit component', async () => {
        expect(wrapper.vm.isOwner).toBeTruthy()
        expect(wrapper.vm.editing).toBeFalsy()

        const editButton = wrapper.find('#editButton')
        expect(editButton.exists()).toBeTruthy()

        await editButton.trigger('click')
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.editing).toBe(true)

        const profileEdit = wrapper.findComponent({ref: "profileEdit"})
        expect(profileEdit.exists()).toBe(true)
    })

    it('Clicking delete button changes deleting value and show confirm message and new buttons', async () => {
        expect(wrapper.vm.isOwner).toBeTruthy()
        expect(wrapper.vm.deleting).toBeFalsy()

        const controlButtons = wrapper.find('#controlButtons')
        expect(controlButtons.exists()).toBeTruthy()

        const deleteButton = wrapper.find('#deleteButton')
        expect(deleteButton.exists()).toBeTruthy()

        await deleteButton.trigger('click')
        await wrapper.vm.$nextTick()

        const youSure = wrapper.find('#areYouSure')
        expect(youSure.exists()).toBeTruthy()

        const confirmButton = wrapper.find('#confirmDelete')
        expect(confirmButton.exists()).toBeTruthy()

        const cancelButton = wrapper.find('#cancelButton')
        expect(cancelButton.exists()).toBeTruthy()
    })

    it('Confirm delete button send delete request', async () => {
        expect(wrapper.vm.isOwner).toBeTruthy()
        expect(wrapper.vm.deleting).toBeFalsy()

        const deleteButton = wrapper.find('#deleteButton')
        expect(deleteButton.exists()).toBeTruthy()

        await deleteButton.trigger('click')
        await wrapper.vm.$nextTick()

        const confirmButton = wrapper.find('#confirmDelete')
        expect(confirmButton.exists()).toBeTruthy()
       

        await confirmButton.trigger('click')
        await wrapper.vm.$nextTick()

        await flushPromises()

        expect(axios.delete).toHaveBeenCalledTimes(1)
        expect(axios.delete).toBeCalledWith(expect.stringMatching('/api/Profile/'))

    })

    it('Cancel button sets deleting value to false and confirm delete message not showing', async () => {

        expect(wrapper.vm.isOwner).toBeTruthy()
        expect(wrapper.vm.deleting).toBeFalsy()

        const deleteButton = wrapper.find('#deleteButton')
        expect(deleteButton.exists()).toBeTruthy()
        expect(deleteButton.text()).toMatch('Delete')

        await deleteButton.trigger('click')
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.deleting).toBeTruthy()
        const youSure = wrapper.find('#areYouSure')
        expect(youSure.exists()).toBeTruthy()

        const cancelButton = wrapper.find('#cancelButton')
        expect(cancelButton.exists()).toBeTruthy()

        await cancelButton.trigger('click')
        await wrapper.vm.$nextTick()

        const areyouSure = wrapper.find('#areYouSure')
        
        expect(wrapper.vm.deleting).toBeFalsy()
        expect(areyouSure.exists()).toBeFalsy()
    })
})