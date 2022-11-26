import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import NewGameCardHelper from 'src/helpers/NewGameCardHelper.vue'

describe('New Game Card Helper tests', () => {
    let wrapper = null

    beforeEach(()=> {
        wrapper = shallowMount(NewGameCardHelper, {
            props:{
                profileId: "Jepsu"
            }
        })
    })
    
    it('Game Card is loaded correctly', () => {

        expect(wrapper.props().profileId).toMatch('Jepsu')

        const card = wrapper.find('div')
        expect(card.exists()).toBeTruthy()

        const link = wrapper.find('#link')
        expect(link.attributes().to).toMatch('/profile/Jepsu/game/new')
    })

})