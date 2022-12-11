import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import axios from 'axios'
import EditPostComponent from 'src/components/posts/EditPostComponent.vue'


vi.mock("axios", () => {
    return {
        default: {
            put: vi.fn()
        },
    };
});

describe('Tests for the Edit Post Component', () => {
    let wrapper = null

    const transitionStub = () => ({
        render: function (h) {
            return this.$options._renderChildren
        }
    })

    beforeEach(() => {
        const mockResponseData = {
            title: 'Testing title',
            content: 'Testing content for testing purposes',
            photoFileName: '',
            numberOfLikes: 1,
            numberOfDislikes: 2,
            numberOfComments: 3,
        }

        axios.put.mockResolvedValue(mockResponseData)
        // render the component
        wrapper = mount(EditPostComponent, {
            stubs: {
                // Stub out the transition:
                transition: transitionStub()
            },
            attachTo: document.body,
            props: {
                post:
                {
                    title: 'Testing title',
                    content: 'Testing content for testing purposes',
                    photoFileName: '',
                    numberOfLikes: 1,
                    numberOfDislikes: 2,
                    numberOfComments: 3,
                    postId: "TestingPost"
                },
                executeEdit: true
            },
        })
    })

    it('Original post title and content show correctly', async () => {
        await flushPromises()

        const title = wrapper.find('#editPostTitle')
        expect(title.element.value).toMatch('Testing title')

        const content = wrapper.find('#editPostContent')
        expect(content.element.value).toMatch('Testing content for testing purposes')

    })

    it('Title and content of the post can be edited', async () => {
        await flushPromises()

        const title = wrapper.find('#editPostTitle')
        expect(title.element.value).toMatch('Testing title')
        await title.setValue('Testing new title here')
        expect(title.element.value).toMatch('Testing new title here')
        

        const content = wrapper.find('#editPostContent')
        expect(content.element.value).toMatch('Testing content for testing purposes')
        await content.setValue('This new content will rock your world!')
        expect(content.element.value).toMatch('This new content will rock your world!')

    })
})