import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { shallowMount  } from '@vue/test-utils'
import axios from 'axios'
import NewCommentComponent from 'src/components/comments/NewCommentComponent.vue'
import { createTestingPinia } from '@pinia/testing'


vi.mock("axios", () => {
    return {
        default: {
            get: vi.fn(),
        },
    };
});

describe('Tests for the New Comment Component', () => {
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
            avatar: "null",
            firstName: "Jesper",
            lastName: "Oja",
            age: "33",
            joiningDate: "null"

        }

        axios.get.mockResolvedValue(mockResponseData)
        // render the component
        wrapper = shallowMount(NewCommentComponent, {
            stubs: {
                // Stub out the transition:
                transition: transitionStub()
            },
            global: {
                plugins: [createTestingPinia()],
                mocks: {
                    $t: () => {}
                }
            },
            data: () => {
                return {
                    me: { nickname: "Xermos", profileId: "Jepsu" },
                    maxLenght: 250,
                    active: false,
                    text: '',
                }
            },attachTo: document.body,
            
        })
    })

    afterEach(() => {
        axios.get.mockReset()
    })

    it('Textarea shows as it should and you can write to it', async () => {
        

        const textArea = wrapper.find('#newComment')
        expect(textArea.attributes().rows).toEqual('1')
        expect(textArea.attributes().maxlength).toBe('250')

        await textArea.setValue('Testing testing')
        expect(textArea.element.value).toMatch('Testing testing')
    })

    it('Buttons show when textarea is active', async () => {

        const textArea = wrapper.find('#newComment')
        await textArea.trigger('focus')
        await textArea.setValue('Testing testing')

        expect(textArea.element.value).toMatch('Testing testing')
        expect(wrapper.vm.active).toBeTruthy()

        const buttons = wrapper.find('#buttons')
        expect(buttons.exists()).toBeTruthy();
    })

    it('Clicking cancel button deactives textarea and buttons', async () => {

        const textArea = wrapper.find('#newComment')

        await textArea.trigger('focus')
        await textArea.setValue('Testing testing')

        expect(textArea.element.value).toMatch('Testing testing')
        expect(wrapper.vm.active).toBeTruthy()

        const buttons = wrapper.find('#buttons')
        expect(buttons.exists()).toBeTruthy();

        const cancelButton = wrapper.findComponent({
            ref: "cancelButton"
        })
        await cancelButton.trigger('click')
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.active).toBeFalsy()
        expect(textArea.element.value).toMatch('')
    })
})