import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import NewPostComponent from 'src/components/posts/NewPostComponent.vue'
import { createTestingPinia } from '@pinia/testing'


vi.mock("axios", () => {
    return {
        default: {
            get: vi.fn(),
            post: vi.fn()
        },
    };
});

describe('Tests for the New Post Component', () => {
    let wrapper = null

    beforeEach(() => {
        const mockResponseData = {
            title: 'Testing title',
            content: 'Content for testing purpose',
            photoFileName: null,
            numberOfLikes: 1,
            numberOfDislikes: 3,
            numberOfComments: 2,
        }

        const mockResponseMeData = {
            discordName: "Xermos",
            nickname: "Xermos",
            avatar: "null",
            firstName: "Jesper",
            lastName: "Oja",
            age: "33",
            joiningDate: "null",
            id: "Jepsu"

        }

        axios.post.mockResolvedValue(mockResponseData)
        axios.get.mockResolvedValue(mockResponseMeData)
        // render the component
        wrapper = shallowMount(NewPostComponent, {
            attachTo: document.body,
            addingNew: false,
            global: {
                plugins: [createTestingPinia()]
            },
            data() {
                return {
                    profile: {
                        discordName: "Xermos",
                        nickname: "Xermos",
                        avatar: "null",
                        firstName: "Jesper",
                        lastName: "Oja",
                        age: "33",
                        joiningDate: "null",
                        profileId: "Jepsu"
                    }
                }
            }
        })


    })

    afterEach(() => {
        axios.get.mockReset()
        axios.post.mockReset()
    })

    it('Postheader is showing and getting right data', async () => {
        
        const header = wrapper.findComponent({ ref: "postHeader" })
        expect(header.exists()).toBeTruthy()
    })

    it('Title input field and Content textarea show correct placeholders', async () => {

        const title = wrapper.find('#newPostTitle')
        expect(title.attributes().placeholder).toMatch('Title your post')

        const content = wrapper.find('#newPostContent')
        expect(content.attributes().placeholder).toMatch('Write some content to your post')
    })

    it('Title and Content fields update when value inputted', async () => {

        const title = wrapper.find('input[id="newPostTitle"]')
        expect(title.attributes().placeholder).toMatch('Title your post')
        expect(title.exists()).toBeTruthy()

        await title.setValue('Testing title creation')
        expect(title.element.value).toMatch('Testing title creation')
        expect(wrapper.vm.postDto.title).toMatch(title.element.value)

        const content = wrapper.find('#newPostContent')
        expect(content.attributes().placeholder).toMatch('Write some content to your post')
        await content.setValue('Testing content')
        expect(content.element.value).toMatch('Testing content')
        expect(wrapper.vm.postDto.content).toMatch('Testing content')
    })

    it('Button rendered correctly', async () => {

        const cancelButton = wrapper.findComponent({ ref: "cancelButton" })
        expect(cancelButton.exists()).toBeTruthy()

        const postButton = wrapper.findComponent({ ref: "postButton" })
        expect(postButton.exists()).toBeTruthy()
        expect(postButton.attributes().disabled).toBe('true')

        const title = wrapper.find('input[id="newPostTitle"]')
        expect(title.attributes().placeholder).toMatch('Title your post')
        await title.setValue('Testing title creation')
        expect(title.element.value).toMatch('Testing title creation')
        expect(wrapper.vm.postDto.title).toMatch(title.element.value)

        const content = wrapper.find('#newPostContent')
        expect(content.attributes().placeholder).toMatch('Write some content to your post')
        await content.setValue('Testing content')
        expect(content.element.value).toMatch('Testing content')
        expect(wrapper.vm.postDto.content).toMatch('Testing content')

        expect(postButton.attributes().disabled).toBe('false')
    })

    it('Cancel button emmits cancel call', async () => {

        const cancelButton = wrapper.findComponent({ ref: "cancelButton" })
        expect(cancelButton.exists()).toBeTruthy()

        await cancelButton.trigger('click')
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted().cancel).toBeTruthy()
    })

    it('PostButton send request and emmits newPost call', async () => {

        const postButton = wrapper.findComponent({ ref: "postButton" })
        expect(postButton.exists()).toBeTruthy()
        expect(postButton.attributes().disabled).toBe('true')

        const title = wrapper.find('input[id="newPostTitle"]')
        expect(title.attributes().placeholder).toMatch('Title your post')
        await title.setValue('Testing title creation')
        expect(title.element.value).toMatch('Testing title creation')
        expect(wrapper.vm.postDto.title).toMatch(title.element.value)

        const content = wrapper.find('#newPostContent')
        expect(content.attributes().placeholder).toMatch('Write some content to your post')
        await content.setValue('Testing content')
        expect(content.element.value).toMatch('Testing content')
        expect(wrapper.vm.postDto.content).toMatch('Testing content')

        expect(postButton.attributes().disabled).toBe('false')

        await postButton.trigger('click')
        await wrapper.vm.$nextTick()

        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(axios.post).toBeCalledWith('https://localhost:5001/api/Post', wrapper.vm.postDto)

        expect(wrapper.emitted().updatePost).toBeTruthy()
        expect(wrapper.emitted().cancel).toBeTruthy()
    })
})