import React from "react";
import Login from './Login'
import Register from './Register';

export default function LoginPage() {
    const [registerForm, showRegister] = React.useState<boolean>(true);

    const showRegisterForm = () => {
        if (registerForm) {
            showRegister(false)
        } else {
            showRegister(true);
        }
    }

    return (
        <div className='flex flex-row h-screen overflow-clip'>
            <Background />
            <div className='basis-1/3 flex flex-col justify-center bg-white shadow-lg z-10'>
                <FormRender isLogin={registerForm} showRegister={showRegister} />
                <button id='registerButton' onClick={() => showRegisterForm()} className='py-3 px-6 mt-6 w-fit text-center mx-auto block uppercase font-semibold subpixel-antialiased font-sm text-gray-500 hover:text-gray-900' > <ButtonText isLogin={registerForm} /> </button>
            </div>
        </div>
    )
}

type MainProps = {
    isLogin: boolean;
    showRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

class FormRender extends React.Component<MainProps> {
    constructor(props: MainProps) {
        super(props)
    }

    render() {
        let formToRender;
        if (this.props.isLogin) {
            formToRender = <Login />
        } else {
            formToRender = <Register closeRegister={this.props.showRegister} />
        }

        return (
            <>
                {formToRender}
            </>
        );
    }

}

type ButtonProps = {
    isLogin: boolean;
}

class ButtonText extends React.Component<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props)
    }

    render() {
        if (this.props.isLogin) {
            return <> Register here </>
        } else {
            return <> Login here </>
        }
    }
}

class Background extends React.Component {
    render() {
        return (
            <div className='basis-2/3 bg-darkBackground relative'>

                <div className='absolute h-[700px] w-[700px] rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 rotate-45 -right-[220px] -top-[366px] z-10'>
                    <div className='absolute h-[670px] w-[670px] bg-darkBackground'></div>
                </div>

                <div className='absolute h-[1100px] w-[1100px] rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 opacity-50 rotate-45 -right-[420px] -top-[566px]'>
                    <div className='absolute h-[1070px] w-[1070px] bg-darkBackground'></div>
                </div>

                <div className='absolute h-[1000px] w-[1100px] rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-50 -rotate-45 -left-[734px] -bottom-1/4 z-10'>
                    <div className='absolute h-[970px] w-[1070px] bg-darkBackground'></div>
                </div>

                <div className='absolute h-[1100px] w-[1100px] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50 -rotate-45 -left-[550px] -bottom-1/4'>
                    <div className='absolute h-[1070px] w-[1070px] bg-darkBackground'></div>
                </div>

            </div>
        );
    }
}