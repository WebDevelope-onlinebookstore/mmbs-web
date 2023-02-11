import {create} from 'zustand';

interface OrderStore{
    order: any[];
    setOrder:(order: any) => void;
    remobeOrder:()=> void;

}
const useStore = create<OrderStore>((set)=>({
    order: [],
    setOrder:(order:any[])=>{
        set((state)=>({...state, order}));
    },
    remobeOrder:() =>{
        set((state)=>({...state, order: []}));
    }
}));
export default useStore;