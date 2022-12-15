import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import PostComponent from 'src/components/posts/PostComponent.vue'
import { createTestingPinia } from '@pinia/testing'
import { useMeStore } from '../../../stores/me.ts'

vi.mock("axios", () => {
    return {
        default: {
            get: vi.fn(),
        },
    };
});

describe('Tests for the Post Component', () => {
    let wrapper = null

    beforeEach(() => {
        const mockResponseData = {
            discordName: "Xermos",
            nickname: "Xermos",
            avatar: "avatar",
            firstName: "Jesper",
            lastName: "Oja",
            age: "33",
            joiningDate: "null",
            id: "Jepsu"
        }

        axios.get.mockResolvedValue(mockResponseData)
        // render the component
        wrapper = shallowMount(PostComponent, {
            props: {
                post: {
                    profileId: "Jepsu",
                    content: "Testing testing",
                    title: "Title for testing",
                    createDate: "12.12.12",
                    numberOfComments: 0,
                    numberOfLikes: 1,
                    numberOfDislikes: 2,
                    postId: "POST"
                }
            },
            global: {
                plugins: [createTestingPinia()],
                mocks:{
                    $t: () => {}
                }
                
            },
            computed: {
                isOwner() {
                    return true
                }
            },

            data: () => {
                return {
                    profile: {
                        avatar: "avatar",
                        profileId: "Jepsu",
                        nickname: "Xermos"
                    },
                    editable: false,
                    commentsOpen: false,
                    comments: []
                }
            }
        })


    })

    afterEach(() => {
        axios.get.mockReset()
        
    })

    it('Comment button shows be first to comment', async () => {

        expect(wrapper.vm.profile.avatar).toMatch('avatar')

        expect(wrapper.vm.commentsOpen).toBeFalsy()

        const beFirst = wrapper.find('#comments')
        expect(beFirst.text()).toMatch("Show 0 Comments")
    })

    it('Post title, content, likes and dislikes shows right', async () => {

        const title = wrapper.find('h2')
        expect(title.text()).toMatch('Title for testing')

        const content = wrapper.find('#content')
        expect(content.text()).toMatch('Testing testing')

        const likes = wrapper.find('#likes')
        expect(likes.text()).toMatch('1')

        const dislikes = wrapper.find('#dislikes')
        expect(dislikes.text()).toMatch('2')
    })

    it('Number of comments shows', async () => {

        wrapper.setProps({
            post: {
                numberOfComments: 2
            }
        })

        expect(wrapper.vm.commentsOpen).toBeFalsy()

        const comments = wrapper.find('#numberOfComments')
        expect(comments.text()).toMatch('Show 2 Comments')

    })

    it('Like and Dislike buttons are shown right', async () => {

        const aside = wrapper.find('#reactButtons')
        expect(aside.exists()).toBeTruthy()

        const likeButton = wrapper.find('#thumbUp')
        expect(likeButton.text()).toMatch('thumb_up')

        const dislikeButton = wrapper.find('#thumbDown')
        expect(dislikeButton.text()).toMatch('thumb_down')
    })

    it('Owner buttons, Edit and Delete, are shown when owner', async () => {

        const aside = wrapper.find(`#${wrapper.props().post.postId}-controls`)
        expect(aside.exists()).toBeTruthy()

        const edit = wrapper.find('#editButton')
        expect(edit.text()).toMatch('edit')

        const deleteButton = wrapper.find('#deleteButton')
        expect(deleteButton.text()).toMatch('delete')
    })

    it('Show comments button works', async () => {

        wrapper.setProps({
            post: {
                numberOfComments: 2
            }
        })

        expect(wrapper.vm.commentsOpen).toBeFalsy()

        const comments = wrapper.find('#numberOfComments')
        expect(comments.text()).toMatch('Show 2 Comments')

        await comments.trigger('click')
        await wrapper.vm.$nextTick()

        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(2)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/GetByPostId/))

        expect(wrapper.vm.commentsOpen).toBeTruthy()

        const layout = wrapper.findComponent({ ref: "commentsLayout" })
        expect(layout.exists()).toBeTruthy();

        const hideButton = wrapper.find('#hideComments')
        expect(hideButton.text()).toMatch('Hide Comments')

        await hideButton.trigger('click')
        await wrapper.vm.$nextTick()

        expect(layout.exists()).toBeFalsy();
        expect(wrapper.vm.commentsOpen).toBeFalsy()
    })
})