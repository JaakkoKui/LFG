import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import CommentComponent from 'src/components/comments/CommentComponent.vue'
import { createTestingPinia } from '@pinia/testing'


vi.mock("axios", () => {
  return {
    default: {
      get: vi.fn(),
    },
  };
});

describe('Tests for the Comment Component', () => {
  let wrapper = null

  beforeEach(() => {
    const mockResponseData = {
      profile: {
        discordName: "Xermos",
        nickname: "Xermos",
        avatar: "null",
        firstName: "Jesper",
        lastName: "Oja",
        age: "33",
        joiningDate: "null",
        id: "Jepsu"
      }
    }

    axios.get.mockResolvedValue(mockResponseData)
    // render the component
    wrapper = shallowMount(CommentComponent, {
      props: {
        comment: {
          content: "Testing",
          date: "12.12.2012",
          profileId: "Jepsu"
        }
      },
      global: {
        mocks:
        {
            $tc: vi.fn()
        },
        plugins: [createTestingPinia()],
    }
    })
  })

  it('check successful events', async () => {
    
    wrapper.setData({ profile: { nickname: "Xermos", id: "Jepsu" } })
    await flushPromises()

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith(expect.stringMatching(/Jepsu/))

    expect(wrapper.props().comment.profileId).toMatch('Jepsu')

    const h4 = wrapper.find('#nickname')
    expect(h4.text()).toMatch('Xermos')

    expect(wrapper.props().comment.content).toMatch("Testing")
    expect(wrapper.findAll('p').at(0).text()).toMatch('Testing')
  })

  it('check failure events without profile info', async () => {

    await flushPromises()

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith(expect.stringMatching(/Jepsu/))

    expect(wrapper.find('#comment').exists()).toBeFalsy();
  })

  it('Check if date showed right', async () => {

    wrapper.setData({ profile: { nickname: "Xermos", id: "Jepsu" } })

    await flushPromises()

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith(expect.stringMatching(/Jepsu/))

    expect(wrapper.props().comment.profileId).toMatch('Jepsu')
    expect(wrapper.find('#comment').exists()).toBeTruthy();

    expect(wrapper.props().comment.date).toMatch("12.12.12")
    const date = wrapper.find('#date')
    expect(date.text()).toMatch('12.12.12')
  })
})