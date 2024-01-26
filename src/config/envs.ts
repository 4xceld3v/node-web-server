import 'dotenv/config';
import {get} from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
    NODE_ENV: get('NODE_ENV').default('development').asString(),
    POSTGRES_URL: get('POSTGRES_URL').required().asString()
}