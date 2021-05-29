export interface Entry {
    id: string;
    date: string;
    title: string;
    description: string;
    pictureUrl: string;
}

export function toEntry(doc: firebase.default.firestore.DocumentSnapshot): Entry {
    return { id: doc.id, ...doc.data() } as Entry;
}