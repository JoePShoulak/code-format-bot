from guesslang import Guess
import sys

sample = """
    % Quick sort

    -module (recursion).
    -export ([qsort/1]).

    qsort([]) -> [];
    qsort([Pivot|T]) ->
          qsort([X || X <- T, X < Pivot])
          ++ [Pivot] ++
          qsort([X || X <- T, X >= Pivot]).
"""

if len(sys.argv) > 1:
    sample = sys.argv[1]

guess = Guess()

name = guess.language_name(sample)

print(name)  # ⟶ Erlang
sys.stdout.flush()
