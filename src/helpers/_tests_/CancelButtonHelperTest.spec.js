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

    it('Cancel Button click emits something', async () => {
        const button = wrapper.find('#Cancel-button')
        expect(button.text()).toMatch('cancel')

        await button.trigger('click')
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted().cancelButtonClick).toBeTruthy()

        expect(wrapper.emitted().cancelButtonClick.length).toBe(1)
    })
})