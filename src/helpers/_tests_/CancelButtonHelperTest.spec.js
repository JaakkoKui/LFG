import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import CancelButtonHelper from 'src/helpers/CancelButtonHelper.vue'

describe('Cancel Button Helper tests', () => {
    let wrapper = null

    beforeEach(()=> {
        wrapper = shallowMount(CancelButtonHelper, {
            global: {
                mocks: {
                    $t: vi.fn()
                }
            }
        })
    })
    
    it('Button is loaded correctly', () => {

        const button = wrapper.find('#Cancel-button')
        expect(button.exists()).toBeTruthy()
    })

})