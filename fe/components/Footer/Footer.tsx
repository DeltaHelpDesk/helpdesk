import Link from "next/link";

function Footer(props) {
    const { classes } = props;
    return (
        <div>
            <footer className={classes.footer}>
                <span>&copy; {new Date().getFullYear()}</span><Link href="/">HelpDesk</Link>
                <Link href="/about">about</Link>
            </footer>
        </div>
    );
}

export default Footer;
