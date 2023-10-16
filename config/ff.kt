private fun createProduct() {
        val name = editTextName?.text.toString()
        val description = editTextDescription?.text.toString()
        val priceText = editTextPrice?.text.toString()

        val files = ArrayList<File>()


        if (isValidForm(name, description, priceText)) {

            val product = Product(
                name = name,
                description = description,
                price = priceText.toDouble(),
                idCategory = idCategory
            )

            files.add(imageFile1!!)
            files.add(imageFile2!!)
            files.add(imageFile3!!)

            ProgressDialogFragment.showProgressBar(this@ProductoNuevoActivity)

            productsProvider?.create(files, product)?.enqueue(object: Callback<ResponseHttp> {
                override fun onResponse(call: Call<ResponseHttp>, response: Response<ResponseHttp>) {
                    ProgressDialogFragment.hideProgressBar(this@ProductoNuevoActivity)

                    Log.d(TAG, "Response: $response")
                    Log.d(TAG, "Body: ${response.body()}")
                    Toast.makeText(this@ProductoNuevoActivity, response.body()?.message, Toast.LENGTH_LONG).show()

                    if (response.body()?.isSuccess == true) {
                        resetForm()
                    }
                }

                override fun onFailure(call: Call<ResponseHttp>, t: Throwable) {
                    ProgressDialogFragment.hideProgressBar(this@ProductoNuevoActivity)
                    Log.d(TAG, "Error: ${t.message}")
                    Toast.makeText(this@ProductoNuevoActivity, "Error: ${t.message}", Toast.LENGTH_LONG).show()
                }

            })

        }

    }