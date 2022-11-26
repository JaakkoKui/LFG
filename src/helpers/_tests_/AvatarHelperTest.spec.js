import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AvatarHelper from 'src/helpers/AvatarHelper.vue'
import { ECDH } from 'crypto'

describe('Avatar Helper tests', () => {
    let wrapper = null

    beforeEach(()=> {
        wrapper = shallowMount(AvatarHelper, {
            props: {
                profileId: "Jepsu",
                avatar: "Avatar"
            }
        })
    })
    
    it('Avatar is loaded correctly', () => {
        expect(wrapper.props().profileId).toMatch('Jepsu')
        expect(wrapper.props().avatar).toMatch('Avatar')

        const avatar = wrapper.find('#avatar')
        expect(avatar.attributes().src).toBe('https://cdn.discordapp.com/avatars/' + wrapper.props().profileId + '/' + wrapper.props().avatar + '.jpg')
        expect(avatar.attributes().alt).toMatch('avatar')
    })

    it('ProfileId not provided', async () => {
        await wrapper.setProps({
            profileId: null
        })

        expect(wrapper.props().profileId).toBe(null)

        const avatar = wrapper.find('#avatar')
        expect(avatar.exists()).toBeFalsy()

        const div = wrapper.find('#noProfileId')
        expect(div.exists()).toBeTruthy()
    })
})