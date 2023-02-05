import { reactive } from 'vue';

export default function useAlertMessage() {
    const state = reactive({
        title: '',
        visible: false,
        isSuccess: false,
        msg: ''
    });

    function setState(visible: boolean, isSuccess: boolean, msg: string, title?: string) {
        state.title = title || isSuccess ? "Opération efectuée avec succès" : "Opération echouée, veuillez réesaayer";
        state.visible = visible;
        state.isSuccess = isSuccess;
        state.msg = msg;
    }

    function close() {
        state.visible = false;
        state.isSuccess = false;
        state.msg = '';
    }

    return {
        state,
        setState: setState,
        close: close,
    }
}