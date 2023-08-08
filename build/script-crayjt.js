
				{
					const __sveltekit_1fifiwi = {
						base: "",
						env: {}
					};

					const element = document.body.firstElementChild;

					Promise.all([
						import("/app/immutable/entry/start.dd14a9ed.js"),
						import("/app/immutable/entry/app.f8d8539c.js")
					]).then(([kit, app]) => {
						kit.start(app, element);
					});
				}
			