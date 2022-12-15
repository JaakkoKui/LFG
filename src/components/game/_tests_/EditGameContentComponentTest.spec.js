import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import EditGameContentComponent from 'src/components/game/EditGameContentComponent.vue'
import { createTestingPinia } from '@pinia/testing'

//Tell vitest what axios commands will be mocked
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
        //Set axios mock data
        axios.put.mockResolvedValue(mockResponseData)
        // render the component
        wrapper = shallowMount(EditGameContentComponent, {
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
                    comments: 'Really great game!',
                    gameId: "HadesTheGame"
                }
            },
            global: {
                plugins: [createTestingPinia()],
            }
        })


    })


    it('Game info shows correctly on edit', async () => {

        expect(wrapper.vm.gameDto.gameName).toMatch('Hades')
        expect(wrapper.vm.gameDto.nicknameInGame).toMatch('Xermos')
        expect(wrapper.vm.gameDto.server).toMatch('EU')
        expect(wrapper.vm.gameDto.rank).toMatch('Godslayer')
        expect(wrapper.vm.gameDto.hoursPlayed).toMatch('100')
        expect(wrapper.vm.gameDto.comments).toMatch('Really great game!')

        //Find inputfield for Game name and check placeholder text
        const gameName = wrapper.find('#gameName')
        expect(gameName.attributes().placeholder).toMatch('Hades')
        //Find inputfield for ingame nickname and check placeholder text
        const nickname = wrapper.find('#nickname')
        expect(nickname.attributes().placeholder).toMatch('Xermos')
        //Find inputfield for hours played and check placeholder text
        const hours = wrapper.find('#hoursPlayed')
        expect(hours.attributes().placeholder).toMatch('100')
        //Find inputfield for server and check placeholder text
        const server = wrapper.find('#server')
        expect(server.attributes().placeholder).toMatch('EU')
        //Find inputfield for rank and check placeholder text
        const rank = wrapper.find('#rank')
        expect(rank.attributes().placeholder).toMatch('Godslayer')
        //Find textare for comments and check placeholder text
        const comments = wrapper.find('#comments')
        expect(comments.attributes().placeholder).toMatch('Really great game!')
    })

    it('Editing game info updates game object', async () => {
        await flushPromises()

        expect(wrapper.vm.gameDto.gameName).toMatch('Hades')
        expect(wrapper.vm.gameDto.nicknameInGame).toMatch('Xermos')
        expect(wrapper.vm.gameDto.server).toMatch('EU')
        expect(wrapper.vm.gameDto.rank).toMatch('Godslayer')
        expect(wrapper.vm.gameDto.hoursPlayed).toMatch('100')
        expect(wrapper.vm.gameDto.comments).toMatch('Really great game!')

        //Find inputfield for ingame nickname and set value and check that it is updated on game object
        const nickname = wrapper.find('#nickname')
        expect(nickname.attributes().placeholder).toMatch('Xermos')
        await nickname.setValue('Xerm')
        expect(nickname.element.value).toMatch('Xerm')
        expect(wrapper.vm.gameDto.nicknameInGame).toMatch('Xerm')
        //Find inputfield for hours played and set value and check that it is updated on game object
        const hours = wrapper.find('#hoursPlayed')
        expect(hours.attributes().placeholder).toMatch('100')
        await hours.setValue(123)
        expect(hours.element.value).toBe(123)
        expect(wrapper.vm.gameDto.hoursPlayed).toBe(123)
        //Find inputfield for server and set value and check that it is updated on game object
        const server = wrapper.find('#server')
        expect(server.attributes().placeholder).toMatch('EU')
        await server.setValue('EU-West')
        expect(server.element.value).toMatch('EU-West')
        expect(wrapper.vm.gameDto.server).toMatch('EU-West')
        //Find inputfield for rank and set value and check that it is updated on game object
        const rank = wrapper.find('#rank')
        expect(rank.attributes().placeholder).toMatch('Godslayer')
        await rank.setValue('God himself')
        expect(rank.element.value).toMatch('God himself')
        expect(wrapper.vm.gameDto.rank).toMatch('God himself')
        //Find textarea for comments and set value and check that it is updated on game object
        const comments = wrapper.find('#comments')
        expect(comments.attributes().placeholder).toMatch('Really great game!')
        await comments.setValue('Still is one of the greatest game made')
        expect(comments.element.value).toMatch('Still is one of the greatest game made')
        expect(wrapper.vm.gameDto.comments).toMatch('Still is one of the greatest game made')
    })

    it('Edit button send request and emits edit call', async () => {

        await flushPromises()
        //Find edit button and click it
        const editButton = wrapper.findComponent({ ref: "editButton"})
        await editButton.trigger('click')
        await wrapper.vm.$nextTick()

        await flushPromises()

        //Check that axios makes right kind of requests with right data
        expect(axios.put).toBeCalledWith(`/api/Game/${wrapper.props().game.gameId}`, wrapper.vm.gameDto)
        //Check that right emmits calls have been made
        expect(wrapper.emitted().updateGame).toBeTruthy()
        expect(wrapper.emitted().cancel).toBeTruthy()
    })

    it('Cancel button emits cancel call', async () => {

        await flushPromises()
        //Find cancel button and click it
        const cancelButton = wrapper.findComponent({ ref: "cancelButton"})
        await cancelButton.trigger('click')
        await wrapper.vm.$nextTick()
        //Check that right emmit call has been made
        expect(wrapper.emitted().cancel).toBeTruthy()
    })

})