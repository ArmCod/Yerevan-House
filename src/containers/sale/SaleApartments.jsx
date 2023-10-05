import React, { useEffect, useMemo, useState } from "react";
import ApartmentFilter from "../../components/saleFiltres/ApartmentFilter";
import SaleTabs from "../../components/tabs/SaleTabs";
import cardImg from "../../assets/images/cardImg.png";
import Card from "../../components/card/Card";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSaleApartmentsPagination } from "../../store/actions/saleApartmentAction";
import { Pagination } from "../../components/pagination/Pagination";
import { changeDetaile } from "../../store/actions/botAction";
import { Link, useNavigate, useParams } from "react-router-dom";

export const base1 =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png";
const base2 =
  "https://www.aveliving.com/AVE/media/Property_Images/Florham%20Park/hero/flor-apt-living-(2)-hero.jpg?ext=.jpg";
const base3 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWhyBKcUL-CMUTUzZqPZSk0bz3gj3dOVv19w&usqp=CAU";
const base4 = "https://i.insider.com/576d4898dd08957f448b4ab8?width=700";
const base5 =
  "https://cdn.vox-cdn.com/thumbor/QcULH1lItUK7n5FR6X8EKfe_pF0=/0x0:660x439/1200x800/filters:focal(278x167:382x271)/cdn.vox-cdn.com/uploads/chorus_image/image/61357925/151210_16-49-06_5DSR6028-thumb.0.1488904272.0.jpg";

const base6 =
  "https://www.thespruce.com/thmb/gyhnF8sC_qRZ0C5CavZtmyNEbiU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/NYC-Micro-Apartment-Studio-Apartment-58793de85f9b584db345c854.jpg";
const base7 =
  "https://cdn.vox-cdn.com/thumbor/U1ee7c9obeDemA8u81AFxMUPcS0=/0x185:2000x1310/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/50923551/160901_11-08-32_5DSR3331.0.0.jpg";

export const images = [base1, base2, base3, base4, base5, base6, base7];
export const data = [
  {
    id: 1,
    stap: false,
    img: cardImg,
    category: " ԲՆԱԿԱՐԱՆ",
    location: "Փոքր կենտրոնում",
    price: "97 000",
    views: 30,
    footage: 70,
    rooms: 3,
    floor: 2,
    images: [base1, base2, base3, base4, base5, base6, base7],
    desc: " Առանց միջնորդի վաճառվում է նորակառույց պրեմիում դասի հյուրանոց Ռոստովյան 15/14 հասցեում։  Ամբողջովին կահավորված և վերանորոգված եվրոպական բարձրորակ և թանկարժեք նյութերով, չշահագործված։  Բաղկացած է 10 համարից, առկա է 2 լյուքս համար, 2 ընդհանուր օգտագործման սենյակ։ 3-րդ հարկը մանսարդային։ Ջեռուցման և հիջովացման կենտրոնացված համակարգ։  Բացօթյա ավտոկայանատեղի մինչև 10 մեքենայի համար։",
    features: [
      "Մակերես 375մ",
      "Սանհանգույցներ 12",
      "Ինտերնետ",
      "Արբ. TV",
      "Հարկ 3",
      "Մշտական ջուր",
      "Նորակառույց",
      "Կաբ. TV",
      "Սենյակ 12",
      "Գազ",
      "Քարե շենք",
      "Անվտանգություն",
    ],
    cordinates:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2780688503267!2d44.52149591585274!3d40.20287707939051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd31e8cd9777%3A0xa86b58b9f3a30e9c!2sEVOCABANK%20%22Azatutyan%2012%22%20Branch!5e0!3m2!1sru!2s!4v1673528389863!5m2!1sru!2s",
  },
  {
    id: 2,
    stap: false,
    img: cardImg,
    category: " ԲՆԱԿԱՐԱՆ 1",
    location: "Փոքր կենտրոնում 1",
    price: "38 000",
    views: 56,
    footage: 90,
    rooms: 4,
    floor: 1,
    images: [base1, base2, base3, base4, base5, base6, base7],
    desc: " Առանց միջնորդի վաճառվում է նորակառույց պրեմիում դասի հյուրանոց Ռոստովյան 15/14 հասցեում։  Ամբողջովին կահավորված և վերանորոգված եվրոպական բարձրորակ և թանկարժեք նյութերով, չշահագործված։  Բաղկացած է 10 համարից, առկա է 2 լյուքս համար, 2 ընդհանուր օգտագործման սենյակ։ 3-րդ հարկը մանսարդային։ Ջեռուցման և հիջովացման կենտրոնացված համակարգ։  Բացօթյա ավտոկայանատեղի մինչև 10 մեքենայի համար։",
    features: [
      "Մակերես 375մ",
      "Սանհանգույցներ 12",
      "Ինտերնետ",
      "Արբ. TV",
      "Հարկ 3",
      "Մշտական ջուր",
      "Նորակառույց",
      "Կաբ. TV",
      "Սենյակ 12",
      "Գազ",
      "Քարե շենք",
      "Անվտանգություն",
    ],
    cordinates:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2780688503267!2d44.52149591585274!3d40.20287707939051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd31e8cd9777%3A0xa86b58b9f3a30e9c!2sEVOCABANK%20%22Azatutyan%2012%22%20Branch!5e0!3m2!1sru!2s!4v1673528389863!5m2!1sru!2s",
  },
  {
    id: 3,
    stap: false,
    img: cardImg,
    category: " ԲՆԱԿԱՐԱՆ 2",
    location: "Փոքր կենտրոնում 2",
    price: "69 000",
    views: 6,
    footage: 56,
    rooms: 2,
    floor: 3,
    images: [base1, base2, base3, base4, base5, base6, base7],
    desc: " Առանց միջնորդի վաճառվում է նորակառույց պրեմիում դասի հյուրանոց Ռոստովյան 15/14 հասցեում։  Ամբողջովին կահավորված և վերանորոգված եվրոպական բարձրորակ և թանկարժեք նյութերով, չշահագործված։  Բաղկացած է 10 համարից, առկա է 2 լյուքս համար, 2 ընդհանուր օգտագործման սենյակ։ 3-րդ հարկը մանսարդային։ Ջեռուցման և հիջովացման կենտրոնացված համակարգ։  Բացօթյա ավտոկայանատեղի մինչև 10 մեքենայի համար։",
    features: [
      "Մակերես 375մ",
      "Սանհանգույցներ 12",
      "Ինտերնետ",
      "Արբ. TV",
      "Հարկ 3",
      "Մշտական ջուր",
      "Նորակառույց",
      "Կաբ. TV",
      "Սենյակ 12",
      "Գազ",
      "Քարե շենք",
      "Անվտանգություն",
    ],
    cordinates:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2780688503267!2d44.52149591585274!3d40.20287707939051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd31e8cd9777%3A0xa86b58b9f3a30e9c!2sEVOCABANK%20%22Azatutyan%2012%22%20Branch!5e0!3m2!1sru!2s!4v1673528389863!5m2!1sru!2s",
  },
  {
    id: 4,
    stap: false,
    img: cardImg,
    category: " ԲՆԱԿԱՐԱՆ 3",
    location: "Փոքր կենտրոնում 3",
    price: "12 000",
    views: 90,
    footage: 36,
    rooms: 5,
    floor: 89,
    images: [base1, base2, base3, base4, base5, base6, base7],
    desc: " Առանց միջնորդի վաճառվում է նորակառույց պրեմիում դասի հյուրանոց Ռոստովյան 15/14 հասցեում։  Ամբողջովին կահավորված և վերանորոգված եվրոպական բարձրորակ և թանկարժեք նյութերով, չշահագործված։  Բաղկացած է 10 համարից, առկա է 2 լյուքս համար, 2 ընդհանուր օգտագործման սենյակ։ 3-րդ հարկը մանսարդային։ Ջեռուցման և հիջովացման կենտրոնացված համակարգ։  Բացօթյա ավտոկայանատեղի մինչև 10 մեքենայի համար։",
    features: [
      "Մակերես 375մ",
      "Սանհանգույցներ 12",
      "Ինտերնետ",
      "Արբ. TV",
      "Հարկ 3",
      "Մշտական ջուր",
      "Նորակառույց",
      "Կաբ. TV",
      "Սենյակ 12",
      "Գազ",
      "Քարե շենք",
      "Անվտանգություն",
    ],
    cordinates:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2780688503267!2d44.52149591585274!3d40.20287707939051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd31e8cd9777%3A0xa86b58b9f3a30e9c!2sEVOCABANK%20%22Azatutyan%2012%22%20Branch!5e0!3m2!1sru!2s!4v1673528389863!5m2!1sru!2s",
  },
  {
    id: 5,
    stap: false,
    img: cardImg,
    category: " ԲՆԱԿԱՐԱՆ 3",
    location: "Փոքր կենտրոնում 3",
    price: "12 000",
    views: 90,
    footage: 36,
    rooms: 5,
    floor: 89,
    images: [base1, base2, base3, base4, base5, base6, base7],
    desc: " Առանց միջնորդի վաճառվում է նորակառույց պրեմիում դասի հյուրանոց Ռոստովյան 15/14 հասցեում։  Ամբողջովին կահավորված և վերանորոգված եվրոպական բարձրորակ և թանկարժեք նյութերով, չշահագործված։  Բաղկացած է 10 համարից, առկա է 2 լյուքս համար, 2 ընդհանուր օգտագործման սենյակ։ 3-րդ հարկը մանսարդային։ Ջեռուցման և հիջովացման կենտրոնացված համակարգ։  Բացօթյա ավտոկայանատեղի մինչև 10 մեքենայի համար։",
    features: [
      "Մակերես 375մ",
      "Սանհանգույցներ 12",
      "Ինտերնետ",
      "Արբ. TV",
      "Հարկ 3",
      "Մշտական ջուր",
      "Նորակառույց",
      "Կաբ. TV",
      "Սենյակ 12",
      "Գազ",
      "Քարե շենք",
      "Անվտանգություն",
    ],
    cordinates:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2780688503267!2d44.52149591585274!3d40.20287707939051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd31e8cd9777%3A0xa86b58b9f3a30e9c!2sEVOCABANK%20%22Azatutyan%2012%22%20Branch!5e0!3m2!1sru!2s!4v1673528389863!5m2!1sru!2s",
  },
  {
    id: 6,
    stap: false,
    img: cardImg,
    category: " ԲՆԱԿԱՐԱՆ 3",
    location: "Փոքր կենտրոնում 3",
    price: "12 000",
    views: 90,
    footage: 36,
    rooms: 5,
    floor: 89,
    images: [base1, base2, base3, base4, base5, base6, base7],
    desc: " Առանց միջնորդի վաճառվում է նորակառույց պրեմիում դասի հյուրանոց Ռոստովյան 15/14 հասցեում։  Ամբողջովին կահավորված և վերանորոգված եվրոպական բարձրորակ և թանկարժեք նյութերով, չշահագործված։  Բաղկացած է 10 համարից, առկա է 2 լյուքս համար, 2 ընդհանուր օգտագործման սենյակ։ 3-րդ հարկը մանսարդային։ Ջեռուցման և հիջովացման կենտրոնացված համակարգ։  Բացօթյա ավտոկայանատեղի մինչև 10 մեքենայի համար։",
    features: [
      "Մակերես 375մ",
      "Սանհանգույցներ 12",
      "Ինտերնետ",
      "Արբ. TV",
      "Հարկ 3",
      "Մշտական ջուր",
      "Նորակառույց",
      "Կաբ. TV",
      "Սենյակ 12",
      "Գազ",
      "Քարե շենք",
      "Անվտանգություն",
    ],
    cordinates:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2780688503267!2d44.52149591585274!3d40.20287707939051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd31e8cd9777%3A0xa86b58b9f3a30e9c!2sEVOCABANK%20%22Azatutyan%2012%22%20Branch!5e0!3m2!1sru!2s!4v1673528389863!5m2!1sru!2s",
  },
  {
    id: 7,
    stap: false,
    img: cardImg,
    category: " ԲՆԱԿԱՐԱՆ 3",
    location: "Փոքր կենտրոնում 3",
    price: "12 000",
    views: 90,
    footage: 36,
    rooms: 5,
    floor: 89,
    images: [base1, base2, base3, base4, base5, base6, base7],
    desc: " Առանց միջնորդի վաճառվում է նորակառույց պրեմիում դասի հյուրանոց Ռոստովյան 15/14 հասցեում։  Ամբողջովին կահավորված և վերանորոգված եվրոպական բարձրորակ և թանկարժեք նյութերով, չշահագործված։  Բաղկացած է 10 համարից, առկա է 2 լյուքս համար, 2 ընդհանուր օգտագործման սենյակ։ 3-րդ հարկը մանսարդային։ Ջեռուցման և հիջովացման կենտրոնացված համակարգ։  Բացօթյա ավտոկայանատեղի մինչև 10 մեքենայի համար։",
    features: [
      "Մակերես 375մ",
      "Սանհանգույցներ 12",
      "Ինտերնետ",
      "Արբ. TV",
      "Հարկ 3",
      "Մշտական ջուր",
      "Նորակառույց",
      "Կաբ. TV",
      "Սենյակ 12",
      "Գազ",
      "Քարե շենք",
      "Անվտանգություն",
    ],
    cordinates:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2780688503267!2d44.52149591585274!3d40.20287707939051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd31e8cd9777%3A0xa86b58b9f3a30e9c!2sEVOCABANK%20%22Azatutyan%2012%22%20Branch!5e0!3m2!1sru!2s!4v1673528389863!5m2!1sru!2s",
  },
  {
    id: 8,
    stap: false,
    img: cardImg,
    category: " ԲՆԱԿԱՐԱՆ 3",
    location: "Փոքր կենտրոնում 3",
    price: "12 000",
    views: 90,
    footage: 36,
    rooms: 5,
    floor: 89,
    images: [base1, base2, base3, base4, base5, base6, base7],
    desc: " Առանց միջնորդի վաճառվում է նորակառույց պրեմիում դասի հյուրանոց Ռոստովյան 15/14 հասցեում։  Ամբողջովին կահավորված և վերանորոգված եվրոպական բարձրորակ և թանկարժեք նյութերով, չշահագործված։  Բաղկացած է 10 համարից, առկա է 2 լյուքս համար, 2 ընդհանուր օգտագործման սենյակ։ 3-րդ հարկը մանսարդային։ Ջեռուցման և հիջովացման կենտրոնացված համակարգ։  Բացօթյա ավտոկայանատեղի մինչև 10 մեքենայի համար։",
    features: [
      "Մակերես 375մ",
      "Սանհանգույցներ 12",
      "Ինտերնետ",
      "Արբ. TV",
      "Հարկ 3",
      "Մշտական ջուր",
      "Նորակառույց",
      "Կաբ. TV",
      "Սենյակ 12",
      "Գազ",
      "Քարե շենք",
      "Անվտանգություն",
    ],
    cordinates:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2780688503267!2d44.52149591585274!3d40.20287707939051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd31e8cd9777%3A0xa86b58b9f3a30e9c!2sEVOCABANK%20%22Azatutyan%2012%22%20Branch!5e0!3m2!1sru!2s!4v1673528389863!5m2!1sru!2s",
  },
  {
    id: 9,
    stap: false,
    img: cardImg,
    category: " ԲՆԱԿԱՐԱՆ 3",
    location: "Փոքր կենտրոնում 3",
    price: "12 000",
    views: 90,
    footage: 36,
    rooms: 5,
    floor: 89,
    images: [base1, base2, base3, base4, base5, base6, base7],
    desc: " Առանց միջնորդի վաճառվում է նորակառույց պրեմիում դասի հյուրանոց Ռոստովյան 15/14 հասցեում։  Ամբողջովին կահավորված և վերանորոգված եվրոպական բարձրորակ և թանկարժեք նյութերով, չշահագործված։  Բաղկացած է 10 համարից, առկա է 2 լյուքս համար, 2 ընդհանուր օգտագործման սենյակ։ 3-րդ հարկը մանսարդային։ Ջեռուցման և հիջովացման կենտրոնացված համակարգ։  Բացօթյա ավտոկայանատեղի մինչև 10 մեքենայի համար։",
    features: [
      "Մակերես 375մ",
      "Սանհանգույցներ 12",
      "Ինտերնետ",
      "Արբ. TV",
      "Հարկ 3",
      "Մշտական ջուր",
      "Նորակառույց",
      "Կաբ. TV",
      "Սենյակ 12",
      "Գազ",
      "Քարե շենք",
      "Անվտանգություն",
    ],
    cordinates:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2780688503267!2d44.52149591585274!3d40.20287707939051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd31e8cd9777%3A0xa86b58b9f3a30e9c!2sEVOCABANK%20%22Azatutyan%2012%22%20Branch!5e0!3m2!1sru!2s!4v1673528389863!5m2!1sru!2s",
  },
  {
    id: 10,
    stap: false,
    img: cardImg,
    category: " ԲՆԱԿԱՐԱՆ 3",
    location: "Փոքր կենտրոնում 3",
    price: "12 000",
    views: 90,
    footage: 36,
    rooms: 5,
    floor: 89,
    images: [base1, base2, base3, base4, base5, base6, base7],
    desc: " Առանց միջնորդի վաճառվում է նորակառույց պրեմիում դասի հյուրանոց Ռոստովյան 15/14 հասցեում։  Ամբողջովին կահավորված և վերանորոգված եվրոպական բարձրորակ և թանկարժեք նյութերով, չշահագործված։  Բաղկացած է 10 համարից, առկա է 2 լյուքս համար, 2 ընդհանուր օգտագործման սենյակ։ 3-րդ հարկը մանսարդային։ Ջեռուցման և հիջովացման կենտրոնացված համակարգ։  Բացօթյա ավտոկայանատեղի մինչև 10 մեքենայի համար։",
    features: [
      "Մակերես 375մ",
      "Սանհանգույցներ 12",
      "Ինտերնետ",
      "Արբ. TV",
      "Հարկ 3",
      "Մշտական ջուր",
      "Նորակառույց",
      "Կաբ. TV",
      "Սենյակ 12",
      "Գազ",
      "Քարե շենք",
      "Անվտանգություն",
    ],
    cordinates:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2780688503267!2d44.52149591585274!3d40.20287707939051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd31e8cd9777%3A0xa86b58b9f3a30e9c!2sEVOCABANK%20%22Azatutyan%2012%22%20Branch!5e0!3m2!1sru!2s!4v1673528389863!5m2!1sru!2s",
  },
  {
    id: 11,
    stap: false,
    img: cardImg,
    category: " ԲՆԱԿԱՐԱՆ 3",
    location: "Փոքր կենտրոնում 3",
    price: "12 000",
    views: 90,
    footage: 36,
    rooms: 5,
    floor: 89,
    images: [base1, base2, base3, base4, base5, base6, base7],
    desc: " Առանց միջնորդի վաճառվում է նորակառույց պրեմիում դասի հյուրանոց Ռոստովյան 15/14 հասցեում։  Ամբողջովին կահավորված և վերանորոգված եվրոպական բարձրորակ և թանկարժեք նյութերով, չշահագործված։  Բաղկացած է 10 համարից, առկա է 2 լյուքս համար, 2 ընդհանուր օգտագործման սենյակ։ 3-րդ հարկը մանսարդային։ Ջեռուցման և հիջովացման կենտրոնացված համակարգ։  Բացօթյա ավտոկայանատեղի մինչև 10 մեքենայի համար։",
    features: [
      "Մակերես 375մ",
      "Սանհանգույցներ 12",
      "Ինտերնետ",
      "Արբ. TV",
      "Հարկ 3",
      "Մշտական ջուր",
      "Նորակառույց",
      "Կաբ. TV",
      "Սենյակ 12",
      "Գազ",
      "Քարե շենք",
      "Անվտանգություն",
    ],
    cordinates:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2780688503267!2d44.52149591585274!3d40.20287707939051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd31e8cd9777%3A0xa86b58b9f3a30e9c!2sEVOCABANK%20%22Azatutyan%2012%22%20Branch!5e0!3m2!1sru!2s!4v1673528389863!5m2!1sru!2s",
  },
  {
    id: 12,
    stap: false,
    img: cardImg,
    category: " ԲՆԱԿԱՐԱՆ 3",
    location: "Փոքր կենտրոնում 3",
    price: "12 000",
    views: 90,
    footage: 36,
    rooms: 5,
    floor: 89,
    images: [base1, base2, base3, base4, base5, base6, base7],
    desc: " Առանց միջնորդի վաճառվում է նորակառույց պրեմիում դասի հյուրանոց Ռոստովյան 15/14 հասցեում։  Ամբողջովին կահավորված և վերանորոգված եվրոպական բարձրորակ և թանկարժեք նյութերով, չշահագործված։  Բաղկացած է 10 համարից, առկա է 2 լյուքս համար, 2 ընդհանուր օգտագործման սենյակ։ 3-րդ հարկը մանսարդային։ Ջեռուցման և հիջովացման կենտրոնացված համակարգ։  Բացօթյա ավտոկայանատեղի մինչև 10 մեքենայի համար։",
    features: [
      "Մակերես 375մ",
      "Սանհանգույցներ 12",
      "Ինտերնետ",
      "Արբ. TV",
      "Հարկ 3",
      "Մշտական ջուր",
      "Նորակառույց",
      "Կաբ. TV",
      "Սենյակ 12",
      "Գազ",
      "Քարե շենք",
      "Անվտանգություն",
    ],
    cordinates:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2780688503267!2d44.52149591585274!3d40.20287707939051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd31e8cd9777%3A0xa86b58b9f3a30e9c!2sEVOCABANK%20%22Azatutyan%2012%22%20Branch!5e0!3m2!1sru!2s!4v1673528389863!5m2!1sru!2s",
  },
];

export default function SaleApartments() {
  const { both, page_idx } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(page_idx);
  const [pages, setPages] = useState([]);
  const items = useSelector((state) => state.saleApartmentsReducer.apartments);
  const count = useSelector((state) => state.saleApartmentsReducer.count);
  const [checks, setChecks] = useState({});
  const [axko, setAxko] = useState(null);
  const [data, setData] = useState({
    min_price: "",
    max_price: "",
    min_area: "",
    max_area: "",
    min_room: "",
    max_room: "",
    min_floor: "",
    max_floor: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(both);
    let obj = {};
    for (const [key, value] of params.entries()) {
      obj[`${key}`] = value;
    }
    if (both == "none&none") {
      dispatch(getSaleApartmentsPagination({ page: Number(page_idx) }));
    } else {
      dispatch(getSaleApartmentsPagination({ page: Number(page_idx), ...obj }));
    }
  }, [both, dispatch]);

  const ApartmentFilterMemo = useMemo(
    () => (
      <ApartmentFilter
        data={data}
        setPage={setPage}
        setData={setData}
        checks={checks}
        setChecks={setChecks}
        axko={axko}
        setAxko={setAxko}
      />
    ),
    [checks, axko, data]
  );

  return (
    <div style={{ margin: "0 auto", padding: "0 10px", maxWidth: "1340px" }}>
      <SaleTabs />
      <div className="sale-boxs">
        {ApartmentFilterMemo}

        <div className="items-box">
          {items?.map(
            ({
              id,
              urgent,
              area,
              address,
              price,
              viewed,
              rooms,
              floor,
              images,
              real_address,
              paym,
            }) => {
              return (
                <Link to={`/sale/apartment/${id}`} key={id}>
                  <Card
                    key={id}
                    stap={urgent}
                    image={images}
                    location={address || real_address}
                    price={price}
                    views={viewed}
                    footage={area}
                    rooms={rooms}
                    floor={floor}
                    path={id}
                    paym={paym}
                    type="apartments"
                  />
                </Link>
              );
            }
          )}
        </div>
      </div>
      <Pagination
        productLength={items?.length}
        count={Math.ceil(count / 16)}
        page={page_idx}
        data={{ ...checks, ...data, bathroom: axko }}
        setPage={setPage}
        pages={pages}
        setPages={setPages}
        action={getSaleApartmentsPagination}
        currentPathName={"/sale/apartments"}
      />
    </div>
  );
}
