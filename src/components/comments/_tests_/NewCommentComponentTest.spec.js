import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import axios from 'axios'
import NewCommentComponent from 'src/components/comments/NewCommentComponent.vue'


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
        wrapper = mount(NewCommentComponent, {
            stubs: {
                // Stub out the transition:
                transition: transitionStub()
            }
        })


    })

    afterEach(() => {
        axios.get.mockReset()
        wrapper.unmount()
    })

    it('Textarea shows as it should and you can write to it', async () => {
        wrapper.setData({
            me: { nickname: "Xermos", profileId: "Jepsu" },
            rows: 2,
            maxLenght: 250,
            active: false,
            text: '',
        })

        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/me/))

        const textArea = wrapper.find('#newComment')
        expect(textArea.attributes().rows).toEqual('2')
        expect(textArea.attributes().maxlength).toBe('250')
        expect(textArea.attributes().placeholder).toMatch('Comment')

        await textArea.setValue('Testing testing')

        expect(textArea.element.value).toMatch('Testing testing')
        expect(wrapper.vm.active).toBeTruthy()

    })

    it('Buttons show when textarea is active', async () => {
        wrapper.setData({
            me: { nickname: "Xermos", profileId: "Jepsu" },
            rows: 2,
            maxLenght: 250,
            active: false,
            text: '',
        })

        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/me/))

        const textArea = wrapper.find('#newComment')

        await textArea.setValue('Testing testing')

        expect(textArea.element.value).toMatch('Testing testing')
        expect(wrapper.vm.active).toBeTruthy()

        const buttons = wrapper.find('#buttons')
        expect(buttons.exists()).toBeTruthy();
    })

    it('Clicking cancel button deactives textarea and buttons', async () => {
        wrapper.setData({
            me: { nickname: "Xermos", profileId: "Jepsu" },
            rows: 2,
            maxLenght: 250,
            active: false,
            text: '',
        })

        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toBeCalledWith(expect.stringMatching(/me/))

        const textArea = wrapper.find('#newComment')

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