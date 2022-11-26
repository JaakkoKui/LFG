import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ButtonHelper from 'src/helpers/ButtonHelper.vue'

describe('Button Helper tests', () => {
    let wrapper = null

    beforeEach(()=> {
        wrapper = shallowMount(ButtonHelper, {
            props: {
                name: "Jepsu"
            }
        })
    })
    
    it('Button is loaded correctly', () => {
        expect(wrapper.props().name).toMatch('Jepsu')

        const button = wrapper.find('#'+wrapper.props().name+'-button')
        expect(button.text()).toMatch('Jepsu')
    })
})