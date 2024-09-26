import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="my-2">
        <button
          className="border bg-customBlue-1 text-white p-2 rounded"
          onClick={() => {
            navigate("/user");
          }}
        >
          User
        </button>
      </div>
      <header className="w-full py-8 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Welcome to JWT Auth
        </h1>
        <p className="mt-2 text-lg md:text-xl lg:text-2xl">
          Secure your applications with JSON Web Tokens
        </p>
      </header>

      <main className="flex flex-col items-center mt-12 px-4">
        <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mb-12">
          <h2 className="text-3xl font-bold mb-4">What is JWT?</h2>
          <p className="text-gray-700 mb-6">
            JSON Web Token (JWT) is an open standard (RFC 7519) that defines a
            compact and self-contained way for securely transmitting information
            between parties as a JSON object. This information can be verified
            and trusted because it is digitally signed. JWTs can be signed using
            a secret (with the HMAC algorithm) or a public/private key pair
            using RSA or ECDSA.
          </p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Use JWT?</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li className="mb-2">
              Compact: JWTs are smaller in size compared to other tokens, making
              them easier to send through URLs, HTTP headers, or POST
              parameters.
            </li>
            <li className="mb-2">
              Self-contained: JWTs contain all the necessary information about
              the user and do not require server-side sessions.
            </li>
            <li className="mb-2">
              Secure: JWTs can be signed and optionally encrypted to ensure the
              integrity and confidentiality of the information contained within
              them.
            </li>
          </ul>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mb-12">
          <h2 className="text-3xl font-bold mb-4">How JWT Works</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              A JWT is a string made up of three parts, separated by dots (.),
              and serialized using base64. In the most common serialization
              format, compact serialization, the JWT looks something like this:{" "}
              <code>xxxxx.yyyyy.zzzzz</code>.
            </p>
            <p>
              - **Header**: The header typically consists of two parts: the type
              of the token, which is JWT, and the signing algorithm being used,
              such as HMAC SHA256 or RSA.
            </p>
            <p>
              - **Payload**: The second part of the token is the payload, which
              contains the claims. Claims are statements about an entity
              (typically, the user) and additional data.
            </p>
            <p>
              - **Signature**: To create the signature part, you have to take
              the encoded header, the encoded payload, a secret, the algorithm
              specified in the header, and sign that.
            </p>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mb-12">
          <h2 className="text-3xl font-bold mb-4">Getting Started with JWT</h2>
          <p className="text-gray-700 mb-6">
            To start using JWTs in your application, you'll need to choose a JWT
            library in your programming language of choice, generate tokens, and
            implement the necessary logic for signing and verifying tokens.
          </p>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">
            <a href="https://jwt.io">Learn More</a>
          </button>
        </section>
      </main>

      <footer className="w-full py-6 bg-gray-800 text-white text-center">
        <p>Developed by Prashant Bansal</p>
      </footer>
    </div>
  );
};

export default Home;
