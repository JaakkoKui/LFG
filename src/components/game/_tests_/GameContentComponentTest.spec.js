import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GameContentComponent from 'src/components/game/GameContentComponent.vue'

describe('Tests for the Game Content Component', () => {
    let wrapper = null

    beforeEach(() => {
        // render the component
        wrapper = shallowMount(GameContentComponent, {
            props: {
                game:{
                    gameName: "Hades",
                    hoursPlayed: "123",
                    gameId: "J3p",
                    rank: 'Godslayer',
                    server: 'EU',
                    nicknameInGame: 'Xermos',
                    comments: 'Really great hack`n`slash game!'
                }
            },
            
        })
    })

    
    it('Game name shows correctly', () => {
        expect(wrapper.props().game.gameName).toMatch('Hades')

        const gameName = wrapper.find('#gameName')
        expect(gameName.text()).toBe('Hades')
    })

    it('Game info shows correctly when given', () => {
        expect(wrapper.props().game.nicknameInGame).toMatch('Xermos')
        expect(wrapper.props().game.rank).toMatch('Godslayer')
        expect(wrapper.props().game.server).toMatch('EU')
        expect(wrapper.props().game.hoursPlayed).toMatch('123')

        const nickname = wrapper.find('#nickname')
        expect(nickname.text()).toMatch('Xermos')

        const hours = wrapper.find('#hours')
        expect(hours.text()).toMatch('123')

        const rank = wrapper.find('#rank')
        expect(rank.text()).toMatch('Godslayer')

        const server = wrapper.find('#server')
        expect(server.text()).toMatch('EU')
    })

    
    it('Game info values show empty if not given', async () => {
        await wrapper.setProps({
            game:{
                hoursPlayed: "",
                rank: '',
                server: '',
                nicknameInGame: '',
                comments: ''
            }
        })

        const nickname = wrapper.find('#nickname')
        expect(nickname.text()).toMatch('')

        const hours = wrapper.find('#hours')
        expect(hours.exists()).toBeFalsy()

        const rank = wrapper.find('#rank')
        expect(rank.exists()).toBeFalsy()

        const server = wrapper.find('#server')
        expect(server.exists()).toBeFalsy()

        const comments = wrapper.find('#comments')
        expect(comments.exists()).toBeFalsy()
    })

    it('Game comments shows correctly', () => {
        expect(wrapper.props().game.comments).toMatch('Really great hack`n`slash game!')

        const comments = wrapper.find('#comments')
        expect(comments.text()).toBe('Really great hack`n`slash game!')
    })
})