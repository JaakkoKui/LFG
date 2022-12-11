import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import PostHeader from 'src/components/posts/PostHeader.vue'
import { createTestingPinia } from '@pinia/testing'

describe('Tests for the Post Header Component', () => {
    let wrapper = null

    beforeEach(() => {
        // render the component
        wrapper = shallowMount(PostHeader, {
            props: {
                profile: {
                    discordName: "Xermos",
                    nickname: "Xermos",
                    avatar: "avatar",
                    firstName: "Jesper",
                    lastName: "Oja",
                    age: "33",
                    joiningDate: "null"
                },
                createDate: "12.11.2022"
            },
            global: {
                mocks:
                {
                    $tc: vi.fn()
                },
                plugins: [createTestingPinia()],
            },
        })
    })

    it('Link and AvatarHelper rendered correctly', () => {

        const link = wrapper.find('#link')
        expect(link.exists()).toBeTruthy()
        expect(link.attributes().to).toMatch(`/profile/${wrapper.props().profile.profileId}`)

        const avatarHelper = wrapper.findComponent({ ref: "avatarHelper"})
        expect(avatarHelper.exists()).toBeTruthy()
        expect(avatarHelper.attributes().avatar).toMatch(wrapper.props().profile.avatar)

    })

    it('Nickname and createDate shows correctly', () => {
        const nickname = wrapper.find('#nickname')
        expect(nickname.exists()).toBeTruthy()
        expect(nickname.text()).toMatch('Xermos')

        const date = wrapper.find('#date')
        expect(date.exists()).toBeTruthy()
    })
})