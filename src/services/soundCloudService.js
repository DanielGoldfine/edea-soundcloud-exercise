import SC from 'soundcloud';

SC.initialize({
    client_id: 'ggX0UomnLs0VmW7qZnCzw'
});

async function getTracks(query) {

    const { searchBy, tracksPerPage, offset } = query;

    const res = await SC.get('/tracks', {
        q: searchBy,
        limit: tracksPerPage,
        offset
    });
    return res;
};

export default {
    getTracks
}