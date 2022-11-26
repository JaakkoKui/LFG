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

    
})