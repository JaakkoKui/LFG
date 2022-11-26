import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import axios from 'axios'
import PostComponent from 'src/components/posts/PostComponent.vue'

vi.mock("axios", () => {
    return {
        default: {
            get: vi.fn(),
        },
    };
});

describe('Tests for the Post Component', () => {
    let wrapper = null

    const transitionStub = () => ({
        render: function (h) {
            return this.$options._renderChildren
        }
    })

    beforeEach(() => {
        const mockResponseData = {
            discordName: "Xermos",
            nickname: "Xermos",
            avatar: "avatar",
            firstName: "Jesper",
            lastName: "Oja",
            age: "33",
            joiningDate: "null"

        }

        axios.get.mockResolvedValue(mockResponseData)
        // render the component
        wrapper = mount(PostComponent, {
            stubs: {
                // Stub out the transition:
                transition: transitionStub()
            },
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
            }
        })


    })

    afterEach(() => {
        axios.get.mockReset()
        wrapper.unmount()
    })

    const startTest = async () => {
        wrapper.setData({
            profile: {
                avatar: "avatar",
                profileId: "Jepsu",
                nickname: "Xermos",

            },
            isOwner: false,
            editable: false,
            commentsOpen: false,
            comments: []
        })

    }

    it('Comment button shows be first to comment', async () => {

        startTest()

        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(3)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/Jepsu/))

        expect(wrapper.vm.profile.avatar).toMatch('avatar')

        expect(wrapper.vm.commentsOpen).toBeFalsy()

        const beFirst = wrapper.find('#comments')
        expect(beFirst.text()).toMatch("Show 0 Comments")
    })

    it('Posters nickname and post date shows', async () => {
        startTest()

        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(3)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/Jepsu/))

        const link = wrapper.find('#nickname')
        expect(link.text()).toMatch("Xermos")

        const date = wrapper.find('#date')
        expect(date.text()).toMatch('12.12.12')
    })

    it('Post title, content, likes and dislikes shows right', async () => {
        startTest()

        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(3)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/Jepsu/))

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
        startTest()

        wrapper.setProps({
            post: {
                numberOfComments: 2
            }
        })

        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(3)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/Jepsu/))

        expect(wrapper.vm.commentsOpen).toBeFalsy()

        const comments = wrapper.find('#numberOfComments')
        expect(comments.text()).toMatch('Show 2 Comments')

    })

    it('Like and Dislike buttons are shown right', async () => {
        startTest()

        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(3)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/Jepsu/))

        expect(wrapper.vm.isOwner).toBeFalsy()

        const aside = wrapper.find('#reactButtons')
        expect(aside.exists()).toBeTruthy()

        const likeButton = wrapper.find('#thumbUp')
        expect(likeButton.text()).toMatch('thumb_up')

        const dislikeButton = wrapper.find('#thumbDown')
        expect(dislikeButton.text()).toMatch('thumb_down')
    })

    it('Owner buttons, Edit and Delete, are shown when owner', async () => {
        wrapper.setData({
            isOwner: true,
            profile: {
                avatar: "avatar",
                profileId: "Jepsu",
                nickname: "Xermos",

            },
        })

        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(3)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/Jepsu/))

        expect(wrapper.vm.isOwner).toBeTruthy()

        const aside = wrapper.find(`#${wrapper.props().post.postId}-controls`)
        expect(aside.exists()).toBeTruthy()

        const edit = wrapper.find('#editButton')
        expect(edit.text()).toMatch('edit')

        const deleteButton = wrapper.find('#deleteButton')
        expect(deleteButton.text()).toMatch('delete')
    })

    it('Show comments button works', async () => {
        startTest()

        wrapper.setProps({
            post: {
                numberOfComments: 2
            }
        })

        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(3)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/Jepsu/))

        expect(wrapper.vm.commentsOpen).toBeFalsy()

        const comments = wrapper.find('#numberOfComments')
        expect(comments.text()).toMatch('Show 2 Comments')

        await comments.trigger('click')
        await wrapper.vm.$nextTick()

        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(5)
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