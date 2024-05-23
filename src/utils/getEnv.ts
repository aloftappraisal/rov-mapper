const isProd = import.meta.env.PROD;

export function getEnv(): 'dev' | 'prod' {
    return isProd ? 'prod' : 'dev';
}
