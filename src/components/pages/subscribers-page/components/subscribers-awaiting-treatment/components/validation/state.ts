import { Pack } from "~/types/pack.type";
import { SubscriberForm } from "~/types/subscriber.type";

interface RegisterSubscriber {
    pack: Pack | null;
    subscriberForm: SubscriberForm | null
}

export const useRegisterSubscriber = () => useState<RegisterSubscriber>('register-subscriber', () => ({
    pack: null,
    subscriberForm: null
}))