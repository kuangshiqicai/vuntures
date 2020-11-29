import { shallowMount } from '@vue/test-utils';
import HelloWorld from './hello-world';
import UserApi from '../apis/user';

// mock 掉 user 模块
jest.mock('../apis/user');

// 指定 getUserInfo 方法返回假数据
UserApi.getUserInfo.mockResolvedValue({
  userId: 1,
  id: 1,
  title: 'test'
});

describe('<hello-world/>', () => {
  const wrapper = shallowMount(HelloWorld);
  test('getUserInfo call 了一次', () => {
    expect(UserApi.getUserInfo.mock.calls.length).toBe(1);
  });
  it('用户信息渲染正确', () => {
    expect(wrapper.find('.info').text()).toEqual('0. userId - 1');
  });
});
