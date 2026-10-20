/*********************************************************************************
* ITE5425 - Mastery Assignment 1: Art Explorer
* I declare that this assignment is my own work in accordance with Humber
* Academic Policy. No part of this assignment has been copied manually or
* electronically from any other source, including websites, or distributed
* to other students.
*
* I understand that I may use Generative AI for learning, debugging, and
* brainstorming, but the submitted work must be customized to this Art
* Explorer assignment and I must be able to explain the code and design decisions.
*
* Name: Maria Catherine Jaramillo Student ID: N01740036 Date: 10-19-2026
*********************************************************************************/
"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  function submit(data) {
    const params = new URLSearchParams({ q: data.keyword.trim() });
    if (data.titleOnly) params.set("title", "true");
    router.push(`/artwork?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label>
        Keyword{" "}
        <input
          className="field"
          placeholder="e.g. sunflowers"
          {...register("keyword", {
            required: "Keyword required",
            minLength: { value: 3, message: "Keyword must be at least 3 characters" },
          })}
        />
      </label>
      {errors.keyword && <p className="error">{errors.keyword.message}</p>}

      <p>
        <label>
          <input type="checkbox" {...register("titleOnly")} /> Search in title only
        </label>
      </p>

      <button className="button" type="submit">Search</button>
    </form>
  );
}