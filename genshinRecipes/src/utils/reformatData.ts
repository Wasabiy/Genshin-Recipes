//gjenbrukbar funksjon

export function reformatData(data,type) {
    return Object.entries(data).map((value: [string, any]) => {
        const key = value[0];
        const mat = value[1];
        return {
            ...mat,
            key: key,
        } as typeof type;
    });
};