import { envs } from '../src/config/envs';
import { Server } from '../src/applications/server';

jest.mock('../src/applications/server');

describe('should call server with arguments and start',  () => {

    test('should work', async() => {

        await import('../src/app');

        expect(Server).toHaveBeenCalledTimes(1);

        expect(Server).toHaveBeenCalledWith({ 
            port: envs.PORT,
            publicPath: envs.PUBLIC_PATH,
            routes: expect.any(Function)
        });

        expect(Server.prototype.start).toHaveBeenCalledWith();
    });

});