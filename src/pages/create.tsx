/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useForm,
  type UseFormRegister,
  type FieldValues,
} from "react-hook-form";
import { useState } from "react";
import RedesignedHeader from "~/components/redesigned/header";

function InputBox({
  name,
  type = "text",
  register,
}: {
  name: string;
  type: string | undefined;
  register: UseFormRegister<FieldValues>;
}) {
  return (
    <div className="flex flex-col space-y-[0.5rem]">
      <label className="text-2xl font-bold">{name}</label>
      <input
        className="w-[50vw] border-b-2 border-green-500 bg-transparent px-[0.75rem] py-2 text-xl outline-none"
        {...register(name)}
        type={type}
      />
    </div>
  );
}

type EventItem = {
  ev_name: string;
  ev_addr: string;
};

export default function Create() {
  const { register, handleSubmit } = useForm();
  const [event_items, setEventItems] = useState<EventItem[]>([
    { ev_name: "", ev_addr: "" },
  ]);

  function submit(values: any) {
    alert(JSON.stringify(values));
    console.log(event_items);
  }

  return (
    <div className="flex flex-col">
      <RedesignedHeader />
      <div className="mx-auto flex flex-col py-4">
        <h1 className="mx-auto py-[3rem] text-4xl font-bold capitalize">
          Explore the World!
        </h1>
        <form
          className="flex flex-col space-y-[1.5rem] px-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(submit);
          }}
        >
          <InputBox name="Title" register={register} type="text" />
          <InputBox name="Description" register={register} type="text" />
          <InputBox name="Start" register={register} type="datetime-local" />
          <InputBox name="End" register={register} type="datetime-local" />
          {event_items.map((item, index) => {
            function change_name(new_value: string) {
              const newItem = { ev_name: new_value, ev_addr: item.ev_addr };
              setEventItems((prev) => {
                const items = [...prev];
                items[index] = newItem;
                return items;
              });
            }

            function change_event(new_value: string) {
              const newItem = { ev_name: item.ev_name, ev_addr: new_value };
              setEventItems((prev) => {
                const items = [...prev];
                items[index] = newItem;
                return items;
              });
            }

            return (
              <div key={index} className="flex flex-row">
                <label className="text-2xl font-bold">Event #{index + 1}</label>
                <input
                  placeholder="Event"
                  className="mx-[0.75rem] w-[20vw] border-b-2 border-green-500 bg-transparent px-[0.75rem] py-2 text-xl outline-none"
                  onChange={(e) => change_name(e.target.value)}
                  value={item.ev_name}
                />
                <input
                  placeholder="Address"
                  className="mx-[0.75rem] w-[20vw] border-b-2 border-green-500 bg-transparent px-[0.75rem] py-2 text-xl outline-none"
                  onChange={(e) => change_event(e.target.value)}
                  value={item.ev_addr}
                />
              </div>
            );
          })}
          <button
            className="rounded-[1rem] border-2 border-black px-4 py-2 font-semibold"
            type="button"
            onClick={() =>
              setEventItems((prev) => [...prev, { ev_name: "", ev_addr: "" }])
            }
          >
            Add Event Item
          </button>
          <button
            className="rounded-[1rem] bg-green-500 px-4 py-2 font-semibold"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
