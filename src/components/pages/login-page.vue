<template>
    <div class="login">
        <div class="illustrative-img"></div>

        <Form ref="formRef" class="m-20 login-form" :model="formState" name="login" autocomplete="off"
            layout="vertical">
            <FormItem>
                <div class="my-20 text-align-center">
                    <h2>Connexion</h2>
                    <p class="fs-14">Connectez-vous pour continuer</p>
                </div>
            </FormItem>

            <FormItem label="Nom utilisateur" name="username"
                :rules="[{ required: true, message: '    Veuillez renseigner votre nom utilisateur!' }]">
                <Input v-model:value="formState.username" />
            </FormItem>

            <FormItem label="Mot de passe" name="password"
                :rules="[{ required: true, message: 'Veuillez renseigner votre mot de passe!' }]">
                <InputPassword v-model:value="formState.password">
                    <template #prefix>
                        <LockOutlined class="site-formItemFormItem-icon" />
                    </template>
                </InputPassword>
                <div class="d-flex justify-content-end">
                    <router-link class="fs-13 fw-bold color-primary" to="/password-forgot-init">Mot de passe oublié
                    </router-link>
                </div>
            </FormItem>

            <FormItem>
                <Button html-type="submit" style="width: 100%" :loading="isSubmitting" type="primary" @click="onSubmit">
                    Se connecter
                </Button>

                <div class="d-flex align-items-center justify-content-end mt-20">
                    <span class="mr-10">Ou</span>

                    <NuxtLink to="/inscription-abonne" class="btn-success-link" style="text-align: end;">
                        Allez sur la page accueil
                    </NuxtLink>
                </div>
            </FormItem>
        </Form>
    </div>
</template>

<script setup lang="ts">
import {
    FormItem,
    InputPassword,
    Form,
    Input,
    Button,
    FormInstance,
    notification
} from 'ant-design-vue';

import { LockOutlined } from '@ant-design/icons-vue';
import { LoginForm } from '~/types/user.type';

definePageMeta({ layout: 'login' });
const formRef = ref<FormInstance>();

const formState = reactive<LoginForm>({
    username: '',
    password: ''
});

const isSubmitting = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const onSubmit = async () => {
    await formRef.value?.validateFields().then(async (values) => {
        isSubmitting.value = true;

        try {
            await authStore.signIn(formState);
            router.push('/');
        } catch (error) {
            notification.error({
                message: 'Echec opération',
                description: "Authentification échouée, veuillez réessayer !",
                placement: "bottomRight"
            });
        } finally {
            isSubmitting.value = false;
        }
    });
};
</script>

<style scoped lang="scss">
.login {
    display: flex;
    background-color: #fff;

    @include sm-down {
        width: 100%;
        margin-left: 20px;
        margin-right: 20px;
    }
}

.illustrative-img {
    background-image: url("~/assets/images/illustrations/5.jpg");
    background-position: center;
    background-size: cover;
    width: 50%;
    height: auto;

    @include md-down {
        display: none;
    }
}

.login-form {
    width: 50%;

    @include md-down {
        width: 100%;
    }
}
</style>