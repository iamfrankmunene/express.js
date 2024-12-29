import { getUserByIdHandler, createUserHandler } from "../handlers/usersHandler.mjs"
import { users } from "../utils/constants.mjs"


jest.mock('express-validator', () => ({
    validationResult: jest.fn(() => ({
        isEmpty: jest.fn(false),
        array: jest.fn(() => [{msg: "Invalid Field."}])
    }))
}))


const mockRequest = {
    findUserIndex: 1,
}

const mockResponse = {
    sendStatus: jest.fn(),
    send: jest.fn(),
    status: jest.fn(() => mockResponse)
}




describe('get users', () => {
    /* beforeEach(() => {
    jest.clearAllMocks()
    }) */
    it('should get user by id', () => {
        getUserByIdHandler(mockRequest, mockResponse)
        expect(mockResponse.send).toHaveBeenCalled()
        expect(mockResponse.send).toHaveBeenCalledWith(users[1])
        expect(mockResponse.send).toHaveBeenCalledTimes(1)
    })
    it('should call sendStatus with 404 when user not found', () => {
        const copyMockRequest = { ...mockRequest, findUserIndex : 10000 }
        getUserByIdHandler(copyMockRequest, mockResponse)
        expect(mockResponse.sendStatus).toHaveBeenCalled()
        expect(mockResponse.sendStatus).toHaveBeenCalledWith(404)
        expect(mockResponse.sendStatus).toHaveBeenCalledTimes(1)
        expect(mockResponse.send).not.toHaveBeenCalled()
    })
})


describe('create users', () => {

    const mockRequest = {}
    

    it('should return status 400 when there are errors', async () => {
        await createUserHandler(mockRequest, mockResponse)
    })
})