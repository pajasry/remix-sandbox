import { PrismaClient } from '@prisma/client';
import { Link, LoaderFunction, useLoaderData } from 'remix';
import { db } from '../../utils/db.server';
import type {Joke} from '@prisma/client';


type LoaderData = { jokes: Array<Joke> };

export let loader: LoaderFunction = async ()=>{
    const data:LoaderData = {
        jokes: await db.joke.findMany()
    }

    return data;
}

export default function Posts() {
    const data = useLoaderData<LoaderData>();
    return (
        <ul id="123">
           {data.jokes.map(joke=>(
               <li id={joke.id}><a href={`/jokes/${joke.id}`}>{joke.name}</a></li>
           ))}
        </ul>
    )
}