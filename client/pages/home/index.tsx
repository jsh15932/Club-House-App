import { IUser } from "../../dto/user.dto";
import type { NextPage } from 'next';
import { useRouter } from "next/router";
import style from "./home.module.scss";
import { BaseWrapper } from "../../layout/base.wrapper";

interface IHome {
    user: IUser;
}

const Home: NextPage<IHome> = ({ user }) => {
    const router = useRouter();
    return(
        <BaseWrapper title={"Home"} description={"Home Page"} userContext={user}>
            <div className={style.home__cap}>
                <div 
                    className={`${style.home__link} pointer`}
                    onClick={() => router.push('/hall')}
                >To Hall</div>
            </div>
        </BaseWrapper>
    )
}

export const getServerSideProps = HomeServerSideProps;

export default Home;