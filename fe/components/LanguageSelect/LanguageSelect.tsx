import { useState, ChangeEvent, FunctionComponent, useContext, useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import mainTheme from "../Themes/MainTheme";
import { useTranslation } from "react-i18next";
import locKeys from "../../src/Locales/LocalizationKeys";
import Loading from "../Loading/Loading";
import { editUserLanguage } from "../../src/graphql/mutations";
import { useMutation } from "react-apollo";
import { EditUserLanguage } from "../../src/graphql/types/EditUserLanguage";
import { ReactAuthContext } from "../../src/graphql/auth";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

interface ILang {
    name: string;
    key: string;
}

const LanguageSelect: FunctionComponent = () => {
    const languages: ILang[] = [
        {
            name: "Čeština",
            key: "cs",
        },
        {
            name: "English",
            key: "en",
        },
    ];

    const { t, i18n } = useTranslation();
    const [lang, setLanguage] = useState<ILang>(languages[0]);
    const [editLang] = useMutation<EditUserLanguage>(editUserLanguage);
    const { user } = useContext(ReactAuthContext);

    const classes = useStyles(mainTheme);

    useEffect(() => {
        if (!user) {
            return;
        }
        const currentLang = languages.find((x) => x.key === user.language);
        setLanguage(currentLang);
    }, [user]);

    const handleChange = async (event: ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        const l = languages.find((x) => x.key === value);

        await i18n.changeLanguage(l.key);
        setLanguage(l);
        const res = await editLang({
            variables: {
                language: l.key,
            },
        });
        // setTimeout(() => {
        //     Router.reload();
        // }, 500);
    };

    return <>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label" shrink>{t(locKeys.settings.languageSelect)}</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                value={lang.key}
                onChange={handleChange}>
                {languages.map((l, i) => <MenuItem value={l.key} key={i}>{l.name}</MenuItem>)}
            </Select>
        </FormControl>
    </>;
};

export default LanguageSelect;
