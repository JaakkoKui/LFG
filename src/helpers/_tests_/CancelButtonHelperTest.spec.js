import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import CancelButtonHelper from 'src/helpers/CancelButtonHelper.vue'

describe('Cancel Button Helper tests', () => {
    let wrapper = null

    beforeEach(()=> {
        wrapper = shallowMount(CancelButtonHelper)
    })
    
    it('Button is loaded correctly', () => {

        const button = wrapper.find('#Cancel-button')
        expect(button.text()).toMatch('cancel')
    })

})