import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileInfoComponent from 'src/components/profile/ProfileInfoComponent.vue'

describe('Tests for the Profile Info Component', () => {
    let wrapper = null

    beforeEach(() => {
        // render the component
        wrapper = mount(ProfileInfoComponent, {
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
                  }
            }
        })
    })

    it('AvatarHelper is getting right values', () => {
        const avatar = wrapper.findComponent({ref: "avatarHelper"})
        expect(avatar.props().avatar).toBe('avatar')
        expect(avatar.props().profileId).toBe('Jepsu')
    })

    it('Profile nickname, fullname, age and joiningDate shows correctly if values given', () => {
        expect(wrapper.props().profile.nickname).toMatch('Xermos')
        expect(wrapper.props().profile.firstName).toMatch('Jesper')
        expect(wrapper.props().profile.lastName).toMatch('Oja')
        expect(wrapper.props().profile.age).toMatch('33')
        expect(wrapper.props().profile.joiningDate).toMatch('12.11.2022')

        const nickname = wrapper.find('#nickname')
        expect(nickname.text()).toMatch('Xermos')

        const fullName = wrapper.find('#fullName')
        expect(fullName.text()).toMatch('Jesper Oja')

        const age = wrapper.find('#age')
        expect(age.text()).toMatch('33')

        const joiningDate = wrapper.find('#joiningDate')
        expect(joiningDate.text()).toMatch('12.11.2022')
    })

    it('Fullname and age not showing if not given', async () => {
        await wrapper.setProps({
            profile: {
                firstName: null,
                lastName: null,
                age: null
              }
        })

        expect(wrapper.vm.profile.firstName).toBe(null)

        const fullname = wrapper.find('#fullName')
        expect(fullname.exists()).toBeFalsy()

        const age = wrapper.find('#age')
        expect(age.exists()).toBeFalsy()
    })

    it('Discord info is rendered correctly', () => {
        expect(wrapper.props().profile.discordName).toMatch('Xermos')

        const discord = wrapper.find('#discord')
        expect(discord.exists()).toBeTruthy()

        const discordName = wrapper.find('#discordName')
        expect(discordName.text()).toMatch('Xermos')

        const image = wrapper.find('img')
        expect(image.attributes().alt).toMatch("avatar")
    })
})