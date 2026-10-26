import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

sizes = [100, 1000, 10000]
median_ms = {"/properties (obyektlar)": [9.1, 12.6, 55.3], "/clients (mijozlar)": [8.9, 11.5, 39.6],
             "/deals (bitimlar)": [9.1, 12.4, 42.0], "/ (bosh sahifa)": [8.8, 8.3, 8.8]}
styles = [("o", "-", "#000"), ("s", "--", "#333"), ("^", "-.", "#666"), ("d", ":", "#000")]
figure, axis = plt.subplots(figsize=(7.5, 4.2), dpi=200)
for (label, values), (marker, linestyle, color) in zip(median_ms.items(), styles):
    axis.plot(sizes, values, marker=marker, linestyle=linestyle, color=color, label=label)
axis.set_xscale("log")
axis.set_xticks(sizes)
axis.set_xticklabels(["100", "1 000", "10 000"])
axis.set_xlabel("Obyektlar va mijozlar soni (har biri)")
axis.set_ylabel("Javob vaqti medianasi, ms")
axis.grid(True, linestyle=":", linewidth=0.6)
axis.legend(frameon=False, fontsize=9)
figure.tight_layout()
figure.savefig(str(__import__("pathlib").Path(__file__).resolve().parents[1] / "rasmlar" / "performance.png"))
