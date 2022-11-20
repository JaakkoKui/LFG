import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GameCardComponent from 'src/components/profile/GameCardComponent.vue'

describe('Tests for the Game Card Component', () => {
    let wrapper = null

    beforeEach(() => {
        // render the component
        wrapper = shallowMount(GameCardComponent, {
            props: {
                profileId: "Jepsu",
                game:{
                    gameName: "Hades",
                    hoursPlayed: "123",
                    gameId: "J3p"
                }
            }
        })
    })

    it("Image is rendered correctly", () => {

        expect(wrapper.props().game.gameName).toBe('Hades')
        const image = wrapper.find('#gameImage')
        expect(image.attributes().alt).toMatch('Hades')

    })

    it("Game name and hours played shows", () => {
        expect(wrapper.props().game.gameName).toBe('Hades')
        expect(wrapper.props().game.hoursPlayed).toBe('123')

        const name = wrapper.find('#gameName')
        expect(name.text()).toMatch('Hades')

        const hours = wrapper.find('#hoursPlayed')
        expect(hours.text()).toMatch('123')
    })

    it("Game Card Links to right place", () => {
        expect(wrapper.props().game.gameId).toBe('J3p')
        expect(wrapper.props().profileId).toBe('Jepsu')

        const link = wrapper.find('#link')
        expect(link.attributes().to).toBe('/profile/Jepsu/game/J3p')
    })
})