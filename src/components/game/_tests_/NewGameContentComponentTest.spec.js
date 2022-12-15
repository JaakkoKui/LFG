import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import NewGameContentComponent from 'src/components/game/NewGameContentComponent.vue'

//Tell vitest what axios commands will be mocked
vi.mock("axios", () => {
    return {
        default: {
            get: vi.fn(),
            post: vi.fn()
        },
    };
});

describe('Tests for the New Game Content Component', () => {
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
        axios.post.mockResolvedValue(mockResponseData)

        // render the component
        wrapper = shallowMount(NewGameContentComponent, {
            stubs: {
                // Stub out the transition:
                transition: transitionStub()
            },
            attachTo: document.body,
            data: () => {
                return {
                    gameDto: {
                        gameName: "Hades",
                        hoursPlayed: "123",
                        rank: 'Godslayer',
                        server: 'EU',
                        nicknameInGame: 'Xermos',
                        comments: 'Really great hack`n`slash game!'
                    }
                }
            }
        })


    })

    //After each test, reset mocks
    afterEach(() => {
        axios.get.mockReset()
    })

    it('Add new game button works', async () => {
       //Find addGame button
        const addGame = wrapper.findComponent({ ref: "addGame" })
        //click the button
        await addGame.trigger('click')
        await wrapper.vm.$nextTick()

        await flushPromises()
        //Check that axios sends right kind of request and it has been called once
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(axios.post).toBeCalledWith("/api/Game", wrapper.vm.gameDto)
    })

    it('Writing on imput fields update data', async () => {
        //Find inputfield for gameName and seet value on it
        const gameName = wrapper.find('input#gameName')
        await gameName.setValue('Path Of Exile')
        expect(gameName.element.value).toMatch('Path Of Exile')
        expect(wrapper.vm.gameDto.gameName).toMatch('Path Of Exile')
        //Find inputfield for hours played and set value
        const hours = wrapper.find('#hoursPlayed')
        await hours.setValue(333)
        expect(hours.element.value).toBe(333)
        expect(wrapper.vm.gameDto.hoursPlayed).toBe(333)
        //Find inputfield for ingameNickname and set value
        const nickname = wrapper.find('#nickname')
        await nickname.setValue('Xermos')
        expect(nickname.element.value).toMatch('Xermos')
        expect(wrapper.vm.gameDto.nicknameInGame).toMatch('Xermos')
        //Find inputfield for rank and set value
        const rank = wrapper.find('#rank')
        await rank.setValue('Godslayer')
        expect(rank.element.value).toMatch('Godslayer')
        expect(wrapper.vm.gameDto.rank).toMatch('Godslayer')
        //Find inputfield for server and set value
        const server = wrapper.find('#server')
        await server.setValue('EU')
        expect(server.element.value).toMatch('EU')
        expect(wrapper.vm.gameDto.server).toMatch('EU')
        //Find textarea for comments and set value
        const comments = wrapper.find('#comments')
        await comments.setValue('Greatest ARPG ever made!')
        expect(comments.element.value).toMatch('Greatest ARPG ever made!')
        expect(wrapper.vm.gameDto.comments).toMatch('Greatest ARPG ever made!')
    })
})