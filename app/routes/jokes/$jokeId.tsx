import { Joke } from "@prisma/client";
import { LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import invariant from "tiny-invariant";

type LoaderData = {joke:Joke};

export let loader: LoaderFunction = async ({params}) =>{
    console.log(params)
    invariant(params.jokeId,'Expected params.jokeId');
    const {jokeId} = params;

    const joke = await db.joke.findUnique({
        where: {id:jokeId}
    })

    invariant(joke, 'Joke should not be null');
    
    return joke;
}

export default function Joke(){
    const joke = useLoaderData<Joke>();
    return (
        <div>
            <h1>{joke.name}</h1>
            <p>{joke.content}</p>
        </div>
    )
}
