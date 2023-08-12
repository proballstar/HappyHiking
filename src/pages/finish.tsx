import { useUser } from '@clerk/nextjs';
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation';

export default function Page() {

    const user = useUser();
    const router = useRouter()

    let fc = useFormik({
        initialValues: {
            numHours: 0,
            about: ""
        },
        onSubmit: async (values) => {
            console.log(values)
            router.push("/")
        }
    })

  return (
    <div>
        <h1>Finish registration</h1>
        <p>
            <form>
                <input {...fc.getFieldProps("numHours")} />
                {fc.errors.about && fc.touched.about && <div>{fc.errors.about}</div>}
                <input {...fc.getFieldProps("about")} />
                {fc.errors.numHours && fc.touched.numHours && <div>{fc.errors.numHours}</div>}
                <button type="button" onClick={() => fc.handleSubmit()}>
                    Submit
                </button>
            </form>
        </p>
    </div>
  );
}