import { failure, success } from './either'

test('success result', () => {
  const result = success('success')

  expect(result.value).toEqual('success')
})

test('failure result', () => {
  const result = failure('error')

  expect(result.value).toEqual('error')
})
