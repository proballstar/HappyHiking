/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useForm,
  type UseFormRegister,
  type FieldValues,
} from "react-hook-form";
import {
  type ChangeEvent,
  type SetStateAction,
  type MouseEvent,
  useState,
} from "react";
import { api } from "~/utils/api";
import RedesignedHeader from "~/components/redesigned/header";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function InputBox({
  name,
  type = "text",
  onChange,
  value,
}: {
  name: string;
  type: string | undefined;
  onChange: SetStateAction<any>;
  value: any;
}) {
  return (
    <div className="flex flex-col space-y-[0.5rem]">
      <label className="text-2xl font-bold">{name}</label>
      <input
        onChange={onChange}
        value={value}
        className="w-[50vw] border-b-2 border-green-500 bg-transparent px-[0.75rem] py-2 text-xl outline-none"
        type={type}
      />
    </div>
  );
}

type EventItem = {
  name: string;
  addr: string;
  start_time: Date;
};

export default function Create() {
  const [event_items, setEventItems] = useState<EventItem[]>([
    { name: "", addr: "", start_time: new Date() },
  ]);
  const user = useUser();
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());
  const [route, setRoute] = useState<any>("");
  const { mutate, isLoading, data, error, isError, isSuccess } =
    api.listings.post.useMutation();
  const router = useRouter();

  function handleSubmit() {
    if (!user.isSignedIn) {
      router.push("/sign-in");
    }
    alert({
      title,
      description,
      start,
      end,
      route,
    });
    mutate({
      author_id: user.user?.imageUrl!,
      name: title,
      desc: description,
      start: start,
      end: end,
      email: user.user?.primaryEmailAddress?.emailAddress!,
      route: route,
      event_items: event_items,
    });
  }

  return (
    <div className="flex flex-col">
      <RedesignedHeader />
      <div className="mx-auto flex flex-col py-4">
        <h1 className="mx-auto py-[3rem] text-4xl font-bold capitalize">
          Explore the World!
        </h1>
        <form className="flex flex-col space-y-[1.5rem] px-6">
          <InputBox
            name="Title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            type="text"
          />
          <InputBox
            name="Description"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            type="text"
          />
          <InputBox
            name="Route"
            value={route}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRoute(e.target.value)
            }
            type="text"
          />
          <InputBox
            name="Start"
            value={start}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStart(e.target.valueAsDate!)
            }
            type="datetime-local"
          />
          <InputBox
            name="End"
            value={end}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEnd(e.target.valueAsDate!)
            }
            type="datetime-local"
          />
          {event_items.map((item, index) => {
            function change_name(new_value: string) {
              const newItem = {
                name: new_value,
                addr: item.addr,
                start_time: item.start_time,
              };
              setEventItems((prev) => {
                const items = [...prev];
                items[index] = newItem;
                return items;
              });
            }

            function change_event(new_value: string) {
              const newItem = {
                name: item.name,
                addr: new_value,
                start_time: item.start_time,
              };
              setEventItems((prev) => {
                const items = [...prev];
                items[index] = newItem;
                return items;
              });
            }

            function change_start(new_value: Date) {
              const newItem = {
                name: item.name,
                addr: item.addr,
                start_time: new_value,
              };
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
                  placeholder="Start"
                  type="time"
                  className="mx-[0.75rem] w-[20vw] border-b-2 border-green-500 bg-transparent px-[0.75rem] py-2 text-xl outline-none"
                  onChange={(e) => change_start(e.target.valueAsDate!)}
                />
                <input
                  placeholder="Event"
                  className="mx-[0.75rem] w-[20vw] border-b-2 border-green-500 bg-transparent px-[0.75rem] py-2 text-xl outline-none"
                  onChange={(e) => change_name(e.target.value)}
                  value={item.name}
                />
                <input
                  placeholder="Address"
                  className="mx-[0.75rem] w-[20vw] border-b-2 border-green-500 bg-transparent px-[0.75rem] py-2 text-xl outline-none"
                  onChange={(e) => change_event(e.target.value)}
                  value={item.addr}
                />
              </div>
            );
          })}
          <button
            className="rounded-[1rem] border-2 border-black px-4 py-2 font-semibold"
            type="button"
            onClick={() =>
              setEventItems((prev) => [
                ...prev,
                { name: "", addr: "", start_time: new Date() },
              ])
            }
          >
            Add Event Item
          </button>
          <button
            className="rounded-[1rem] bg-green-500 px-4 py-2 font-semibold"
            type="submit"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
