import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import ProfileEditComponent from 'src/components/profile/ProfileEditComponent.vue'
import exp from 'constants';


vi.mock("axios", () => {
    return {
        default: {
            put: vi.fn(),
            get: vi.fn()
        },
    };
});

describe('Tests for the Profile Edit Component', () => {
    let wrapper = null

    const transitionStub = () => ({
        render: function (h) {
            return this.$options._renderChildren
        }
    })

    beforeEach(() => {
        const mockResponseData = {
            nickname: 'Xerm',
            firstName: 'Jeppe',
            lastName: 'Ojansson',
            age: 30,
        }
        const mockMeResponseData = {
            nickname: 'Xermos',
            firstName: 'Jesper',
            lastName: 'Oja',
            age: 33,
        }

        axios.put.mockResolvedValue(mockResponseData)
        axios.get.mockResolvedValue(mockMeResponseData)
        // render the component
        wrapper = shallowMount(ProfileEditComponent, {
            stubs: {
                // Stub out the transition:
                transition: transitionStub()
            },
            attachTo: document.body
        })
    })

    const atTheStart = async () => {
        await wrapper.setData({
            profileDto: {
                nickname: 'Xermos',
                firstName: 'Jesper',
                lastName: 'Oja',
                age: 33,
            },
            me: {
                nickname: 'Xermos',
                firstName: 'Jesper',
                lastName: 'Oja',
                age: 33,
            }
        })
    }

    afterEach(() => {
        axios.get.mockReset()
        wrapper.unmount()
      })

    it('Data is loaded correctly at the start', async () => {
        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/me/))

        atTheStart()
        
        expect(wrapper.vm.profileDto.nickname).toMatch('Xermos')
        expect(wrapper.vm.profileDto.firstName).toMatch('Jesper')
        expect(wrapper.vm.profileDto.lastName).toMatch('Oja')
        expect(wrapper.vm.profileDto.age).toBe(33)
    })

    it('Current profile info is shown in input fields', async () => {
        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/me/))

        await atTheStart()

        const nickname = wrapper.find('#nickname')
        expect(nickname.element.value).toMatch('Xermos')

        const firstName = wrapper.find('#firstName')
        expect(firstName.element.value).toMatch('Jesper')

        const lastName = wrapper.find('#lastName')
        expect(lastName.element.value).toMatch('Oja')

        const age = wrapper.find('#age')
        expect(age.element.value).toBe('33')
    })

    it('Changing input field values change values in profileDto object', async () => {
        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/me/))

        await atTheStart()

        const nickname = wrapper.find('#nickname')
        expect(nickname.element.value).toMatch('Xermos')
        await nickname.setValue('Xerm')
        expect(wrapper.vm.profileDto.nickname).toMatch('Xerm')

        const firstName = wrapper.find('#firstName')
        expect(firstName.element.value).toMatch('Jesper')
        await firstName.setValue('Jeppe')
        expect(wrapper.vm.profileDto.firstName).toMatch('Jeppe')

        const lastName = wrapper.find('#lastName')
        expect(lastName.element.value).toMatch('Oja')
        await lastName.setValue('Ojansson')
        expect(wrapper.vm.profileDto.lastName).toMatch('Ojansson')

        const age = wrapper.find('#age')
        expect(age.element.value).toBe('33')
        await age.setValue(30)
        expect(wrapper.vm.profileDto.age).toBe(30)
    })

    it('Cancel button and edit button rendered correctly', async () => {
        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/me/))

        await atTheStart()

        const editButton = wrapper.findComponent({ref:'editButton'})
        expect(editButton.exists()).toBeTruthy()
        expect(editButton.attributes().name).toBe('edit')

        const cancelButton = wrapper.findComponent({ ref: 'cancelButton'})
        expect(cancelButton.exists()).toBeTruthy()
        
    })

    it('Clicking edit button send put request and emmits cancel and done calls', async () => {
        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/me/))

        await atTheStart()

        const editButton = wrapper.findComponent({ref:'editButton'})
        expect(editButton.exists()).toBeTruthy()
        expect(editButton.attributes().name).toBe('edit')

        await editButton.trigger('click')
        await wrapper.vm.$nextTick()

        await flushPromises()

        expect(axios.put).toHaveBeenCalledTimes(1)
        expect(axios.put).toBeCalledWith('/api/Profile', wrapper.vm.profileDto)

        expect(wrapper.emitted().done).toBeTruthy()
        expect(wrapper.emitted().cancel).toBeTruthy()
    })

    it('Clicking cancel button emmits cancel call', async () => {
        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/me/))

        await atTheStart()

        const cancelButton = wrapper.findComponent({ ref: 'cancelButton'})
        expect(cancelButton.exists()).toBeTruthy()

        await cancelButton.trigger('click')
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted().cancel).toBeTruthy()
    })
})