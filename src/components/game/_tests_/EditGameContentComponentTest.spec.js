import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import axios from 'axios'
import EditGameContentComponent from 'src/components/game/EditGameContentComponent.vue'


vi.mock("axios", () => {
    return {
        default: {
            put: vi.fn()
        },
    };
});

describe('Tests for the Edit Game Content Component', () => {
    let wrapper = null

    const transitionStub = () => ({
        render: function (h) {
            return this.$options._renderChildren
        }
    })

    beforeEach(() => {
        const mockResponseData = {
            gameName: "Hades",
            hoursPlayed: "123",
            rank: 'Godslayer',
            server: 'EU',
            nicknameInGame: 'Xermos',
            comments: 'Really great hack`n`slash game!'
        }

        axios.put.mockResolvedValue(mockResponseData)
        // render the component
        wrapper = mount(EditGameContentComponent, {
            stubs: {
                // Stub out the transition:
                transition: transitionStub()
            },
            attachTo: document.body,
            props: {
                game:
                {
                    gameName: "Hades",
                    hoursPlayed: "100",
                    rank: 'Godslayer',
                    server: 'EU',
                    nicknameInGame: 'Xermos',
                    comments: 'Really great hack`n`slash game!',
                    gameId: "HadesTheGame"
                }
            }
        })


    })


    it('Game info shows correctly on edit', async () => {

        await flushPromises()

        expect(wrapper.vm.gameDto.gameName).toMatch('Hades')
        expect(wrapper.vm.gameDto.nicknameInGame).toMatch('Xermos')
        expect(wrapper.vm.gameDto.server).toMatch('EU')
        expect(wrapper.vm.gameDto.rank).toMatch('Godslayer')
        expect(wrapper.vm.gameDto.hoursPlayed).toMatch('100')
        expect(wrapper.vm.gameDto.comments).toMatch('Really great hack`n`slash game!')


        const gameName = wrapper.find('#gameName')
        expect(gameName.attributes().placeholder).toMatch('Hades')
        
        const nickname = wrapper.find('#nickname')
        expect(nickname.attributes().placeholder).toMatch('Xermos')

        const hours = wrapper.find('#hoursPlayed')
        expect(hours.attributes().placeholder).toMatch('100')

        const server = wrapper.find('#server')
        expect(server.attributes().placeholder).toMatch('EU')

        const rank = wrapper.find('#rank')
        expect(rank.attributes().placeholder).toMatch('Godslayer')

        const comments = wrapper.find('#comments')
        expect(comments.attributes().placeholder).toMatch('Really great hack`n`slash game!')
    })

    it('Editing game info updates game object', async () => {
        await flushPromises()

        expect(wrapper.vm.gameDto.gameName).toMatch('Hades')
        expect(wrapper.vm.gameDto.nicknameInGame).toMatch('Xermos')
        expect(wrapper.vm.gameDto.server).toMatch('EU')
        expect(wrapper.vm.gameDto.rank).toMatch('Godslayer')
        expect(wrapper.vm.gameDto.hoursPlayed).toMatch('100')
        expect(wrapper.vm.gameDto.comments).toMatch('Really great hack`n`slash game!')

        const nickname = wrapper.find('#nickname')
        expect(nickname.attributes().placeholder).toMatch('Xermos')
        await nickname.setValue('Xerm')
        expect(nickname.element.value).toMatch('Xerm')
        expect(wrapper.vm.gameDto.nicknameInGame).toMatch('Xerm')

        const hours = wrapper.find('#hoursPlayed')
        expect(hours.attributes().placeholder).toMatch('100')
        await hours.setValue(123)
        expect(hours.element.value).toBe('123')
        expect(wrapper.vm.gameDto.hoursPlayed).toBe(123)

        const server = wrapper.find('#server')
        expect(server.attributes().placeholder).toMatch('EU')
        await server.setValue('EU-West')
        expect(server.element.value).toMatch('EU-West')
        expect(wrapper.vm.gameDto.server).toMatch('EU-West')

        const rank = wrapper.find('#rank')
        expect(rank.attributes().placeholder).toMatch('Godslayer')
        await rank.setValue('God himself')
        expect(rank.element.value).toMatch('God himself')
        expect(wrapper.vm.gameDto.rank).toMatch('God himself')

        const comments = wrapper.find('#comments')
        expect(comments.attributes().placeholder).toMatch('Really great hack`n`slash game!')
        await comments.setValue('Still is one of the greatest game made')
        expect(comments.element.value).toMatch('Still is one of the greatest game made')
        expect(wrapper.vm.gameDto.comments).toMatch('Still is one of the greatest game made')
    })

    it('Edit button send request and emits edit call', async () => {

        await flushPromises()

        const editButton = wrapper.findComponent({ ref: "editButton"})
        await editButton.trigger('click')
        await wrapper.vm.$nextTick()

        expect(axios.put).toHaveBeenCalledTimes(1)
        expect(axios.put).toBeCalledWith(`/api/Game/${wrapper.props().game.gameId}`, wrapper.vm.gameDto)

        expect(wrapper.emitted().updateGame).toBeTruthy()
        expect(wrapper.emitted().cancel).toBeTruthy()

    })

    it('Cancel button emits cancel call', async () => {

        await flushPromises()

        const cancelButton = wrapper.findComponent({ ref: "cancelButton"})
        await cancelButton.trigger('click')
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted().cancel).toBeTruthy()
    })

})