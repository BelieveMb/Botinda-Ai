import { MainButton } from "../components/smallComponents/mainButton";

export default function Homepage() {







  return (
    <section className="w-full layoutMain ">
      <aside className="w-full lg:w-xl flex flex-col justify-center items-center">
        <div className="my-40 flex flex-col justify-center items-center content-center">
          <img src="./../../public/logo.png" alt="logo Botinda,"  className="w-60  lg:w-80 h-52 lg:h-60" />
          <h1 class="text-2xl lg:text-3xl font-semibold tracking-tight text-balance text-white sm:text-7xl text-center -mt-7 w-full lg:w-[28rem]">Je géres tes commandes pendant que tu dors.</h1>

        </div>
        <MainButton title="👉 Commencez gratuitement" to={"/Login"}/>
      </aside>

      <div className="my-8 lg:my-6 flex justify-center content-center">
        <p>© BoTinda 2025 | Contact | CGU</p>
      </div>

    </section>
  );
}