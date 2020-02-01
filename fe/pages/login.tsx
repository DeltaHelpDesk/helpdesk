import Layout from "../components/Layouts/Layout";
import { NextPage } from "next";
import LoginPageComponent from "../components/Login/Login";
import { useTranslation } from "react-i18next";
import locKeys from "../src/Locales/LocalizationKeys";

const LoginPage: NextPage = () => {
    const { t } = useTranslation();
    
    return <>
        <Layout title={t(locKeys.login)}>
            <div className={"pt-5"}>
                <LoginPageComponent showPassword={false} user={null} />
            </div>
        </Layout>
    </>;
};

export default LoginPage;
